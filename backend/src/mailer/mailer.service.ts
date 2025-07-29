import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  private getTemplatePath(fileName: string): string {
    const basePath =
      process.env.NODE_ENV === 'production'
        ? join(__dirname, 'templates')
        : join(process.cwd(), 'src', 'mailer', 'templates');

    return join(basePath, fileName);
  }

  private async renderTemplate(templateName: string, data: any): Promise<string> {
    const templatePath = this.getTemplatePath(`${templateName}.ejs`);
    const templateStr = readFileSync(templatePath, 'utf-8');
    return ejs.render(templateStr, data);
  }

  async sendMail(options: {
    to: string;
    subject: string;
    template: string;
    context: any;
  }) {
    const html = await this.renderTemplate(options.template, options.context);

    await this.transporter.sendMail({
      from: `"Sendora Courier" <${process.env.MAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html,
      attachments: [
        {
          filename: 'TruckLogo.png',
          path: this.getTemplatePath('TruckLogo.png'),
          cid: 'logo',
        },
      ],
    });
  }
}
