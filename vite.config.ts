import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function registrationApiPlugin(): Plugin {
  const registrationsFilePath = path.resolve(__dirname, 'registrations.json');

  // Ensure registrations file exists
  if (!fs.existsSync(registrationsFilePath)) {
    fs.writeFileSync(registrationsFilePath, JSON.stringify([], null, 2), 'utf-8');
  }

  return {
    name: 'registration-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // GET /api/registrations - allows club leaders to export or view all participants
        if (req.url === '/api/registrations' && req.method === 'GET') {
          try {
            const fileData = fs.readFileSync(registrationsFilePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(fileData);
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read registrations' }));
          }
          return;
        }

        // POST /api/register
        if (req.url === '/api/register' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');

              // 1. Save locally to registrations.json with complete details
              let existing: any[] = [];
              try {
                existing = JSON.parse(fs.readFileSync(registrationsFilePath, 'utf-8') || '[]');
              } catch {
                existing = [];
              }
              const registrationRecord = {
                id: `reg_${Date.now()}`,
                studentName: data.name,
                usn: data.usn,
                email: data.email,
                phone: data.phone,
                branch: data.branch,
                year: data.year,
                eventTitle: data.eventTitle,
                college: 'Cauvery Institute of Technology, Mandya',
                timestamp: new Date().toISOString(),
              };
              existing.unshift(registrationRecord);
              fs.writeFileSync(registrationsFilePath, JSON.stringify(existing, null, 2), 'utf-8');

              console.log('====================================================');
              console.log('📌 NEW CIT DEVHUB REGISTRATION LOGGED:');
              console.log('• Student Name :', data.name);
              console.log('• USN / Roll No:', data.usn);
              console.log('• Email        :', data.email);
              console.log('• Phone        :', data.phone);
              console.log('• Branch       :', data.branch);
              console.log('• Year         :', data.year);
              console.log('• Event        :', data.eventTitle);
              console.log('• Sent to      : citdevhub@gmail.com');
              console.log('====================================================');

              // 2. Dispatch to FormSubmit with clean, human-readable field labels
              let emailDeliveryStatus = 'pending';
              let emailMessage = '';
              try {
                const params = new URLSearchParams();
                params.append('_subject', `[CIT DevHub Registration] ${data.name} (${data.usn}) - ${data.eventTitle}`);
                params.append('_template', 'table');
                params.append('_captcha', 'false');
                params.append('Student Name', data.name || 'Not provided');
                params.append('USN / Roll Number', data.usn || 'Not provided');
                params.append('Student Email', data.email || 'Not provided');
                params.append('WhatsApp / Phone', data.phone || 'Not provided');
                params.append('Branch / Department', data.branch || 'Not provided');
                params.append('Year of Study', data.year || 'Not provided');
                params.append('Workshop / Event', data.eventTitle || 'Not provided');
                params.append('College', 'Cauvery Institute of Technology, Mandya');
                params.append('Registered At', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

                const emailResponse = await fetch('https://formsubmit.co/ajax/citdevhub@gmail.com', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                    Origin: 'https://citdevhub.edu',
                    Referer: 'https://citdevhub.edu',
                  },
                  body: params.toString(),
                });

                const emailJson = await emailResponse.json();
                console.log('FormSubmit delivery result:', emailJson);

                if (emailJson.success === 'true' || emailJson.success === true) {
                  emailDeliveryStatus = 'delivered';
                  emailMessage = 'Email delivered directly to citdevhub@gmail.com';
                } else if (emailJson.message && emailJson.message.includes('needs Activation')) {
                  emailDeliveryStatus = 'activation_required';
                  emailMessage =
                    "FormSubmit requires one-time activation. Click 'Activate Form' in the email sent to citdevhub@gmail.com.";
                } else {
                  emailDeliveryStatus = 'attempted';
                  emailMessage = emailJson.message || 'Email dispatch attempted';
                }
              } catch (fetchErr) {
                console.warn('FormSubmit email dispatch error:', fetchErr);
                emailDeliveryStatus = 'failed_network';
                emailMessage = 'Network error contacting mail delivery server';
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  targetEmail: 'citdevhub@gmail.com',
                  deliveryStatus: emailDeliveryStatus,
                  message: emailMessage,
                  registration: registrationRecord,
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// Automatically creates a 404.html, .nojekyll, and synchronizes to /docs for all GitHub Pages modes
function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const docsDir = path.resolve(__dirname, 'docs');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');
      const noJekyllPath = path.join(distDir, '.nojekyll');

      if (fs.existsSync(indexPath)) {
        try {
          fs.copyFileSync(indexPath, notFoundPath);
          fs.writeFileSync(noJekyllPath, '');

          // Also mirror dist to docs folder to support "Deploy from branch -> main -> /docs"
          if (fs.existsSync(docsDir)) {
            fs.rmSync(docsDir, { recursive: true, force: true });
          }
          fs.cpSync(distDir, docsDir, { recursive: true });
        } catch {
          // ignore copy error
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // Relative base ensures GitHub Pages serves assets properly regardless of repository subpath
    // e.g. https://<username>.github.io/<repo-name>/
    base: './',
    plugins: [react(), tailwindcss(), registrationApiPlugin(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
