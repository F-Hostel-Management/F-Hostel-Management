using Application.AppConfig;
using Application.Interfaces;
using Application.Models;
using Hangfire;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Application.Services;

public class MailService : IMailService
{
    private readonly AppSettings _appSettings;
    private readonly IBackgroundJobClient _backgroundJob;

    public MailService(IOptions<AppSettings> appSettings, IBackgroundJobClient backgroundJob)
    {
        _backgroundJob = backgroundJob;
        _appSettings = appSettings.Value;
    }

    public async Task SendMailAsync(MailRequest mailRequest)
    {
        _backgroundJob.Enqueue(() =>  SendMail(mailRequest));
    }
    public void SendMail(MailRequest mailRequest)
    {
        var mailSettings = _appSettings.MailSettings;
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(mailSettings.Mail);
        email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
        email.Subject = mailRequest.Subject;
        var builder = new BodyBuilder();
        if (mailRequest.Attachments != null)
        {
            byte[] fileBytes;
            foreach (var file in mailRequest.Attachments)
            {
                if (file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }

                    builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                }
            }
        }

        builder.HtmlBody = mailRequest.Body;
        email.Body = builder.ToMessageBody();
        email.From.Add(MailboxAddress.Parse(mailSettings.Mail));
        using var smtp = new SmtpClient();
        smtp.Connect(mailSettings.Host, mailSettings.Port, SecureSocketOptions.StartTls);
        smtp.Authenticate(mailSettings.UserName, mailSettings.Password);
        smtp.Send(email);
        // _backgroundJob.Enqueue(() => Console.WriteLine("Hello world from Hangfire!"));
        // _backgroundJob.Enqueue(() =>  SendMail(smtp, email));

        smtp.Disconnect(true);
    }

  
}