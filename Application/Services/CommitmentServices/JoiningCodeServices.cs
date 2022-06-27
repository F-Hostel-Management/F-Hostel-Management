using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.Commitment;

namespace Application.Services.CommitmentServices;

public class JoiningCodeServices : IJoiningCodeServices
{
    public readonly IGenericRepository<JoiningCode> _joiningCodeRepository;
    public readonly IGenericRepository<CommitmentEntity> _commitmentCodeRepository;
    private readonly int Min_6_Ditgits = 100000;
    private readonly int Min_7_Ditgits = 1000000;


    public JoiningCodeServices(
        IGenericRepository<JoiningCode> joiningCodeRepository,
        IGenericRepository<CommitmentEntity> commitmentCodeRepository)
    {
        _joiningCodeRepository = joiningCodeRepository;
        _commitmentCodeRepository = commitmentCodeRepository;
    }



    // datecreate, _6digit = null
    public async Task<JoiningCode> CreateJoiningCode(JoiningCode joiningCode)
    {
        Random random = new();
        int SixDigitsCode = 0;
        JoiningCode checkedJc = null;

        checkedJc = await _joiningCodeRepository.FirstOrDefaultAsync(
                jc => jc.CommitmentId.Equals(joiningCode.CommitmentId));

        if (checkedJc != null)
        {
            await _joiningCodeRepository.DeleteAsync(checkedJc.Id);
        }

        do
        {
            SixDigitsCode = random.Next(Min_6_Ditgits, Min_7_Ditgits);
            checkedJc = await _joiningCodeRepository.FirstOrDefaultAsync(
                jc => jc.SixDigitsCode == SixDigitsCode
            );
        } while (checkedJc != null);
        joiningCode.SixDigitsCode = SixDigitsCode;
        joiningCode.CreateDate = DateTime.Now;
        await _joiningCodeRepository.CreateAsync(joiningCode);
        return joiningCode;
    }

    public async Task<JoiningCode> GetJoiningCode(int digits)
    {
        JoiningCode jc =  await _joiningCodeRepository.FirstOrDefaultAsync(jc =>
        jc.SixDigitsCode == digits);
        return jc;
    }

    public void ValidateJoiningCode(JoiningCode joiningCode)
    {
        double timeSpan = DateTime.Now.Subtract(joiningCode.CreateDate).TotalMinutes;
        if (timeSpan > joiningCode.TimeSpan)
        {
            throw new BadRequestException("Joining code is not exists or expired");
        }
    }

    public bool IsValid(JoiningCode joiningCode)
    {
        double timeSpan = DateTime.Now.Subtract(joiningCode.CreateDate).TotalMinutes;
        return timeSpan < joiningCode.TimeSpan;
    }

    public async Task<CommitmentEntity> GetCommitment(JoiningCode joiningCode)
    {
        return await _commitmentCodeRepository.FindByIdAsync(joiningCode.CommitmentId, "Owner", "Room", "Hostel", "RoomTenants", "Images");
    }
}
