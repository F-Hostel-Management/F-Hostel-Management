using Application.Models;

namespace Application.Interfaces;

public interface IMailService
{
    void SendMailSync(MailRequest request);
}