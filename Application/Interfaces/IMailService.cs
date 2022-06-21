using Application.Models;

namespace Application.Interfaces;

public interface IMailService
{
    Task SendMailAsync(MailRequest request);
}