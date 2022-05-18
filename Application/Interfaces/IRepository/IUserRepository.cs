using Application.Interfaces.IRepository;
using Domain.Entities;

namespace Application.Interfaces;

public interface IUserRepository: IGenericRepository<UserEntity>
{
}
