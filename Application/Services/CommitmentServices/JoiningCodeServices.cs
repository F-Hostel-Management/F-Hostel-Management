using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities.Commitment;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                jc => jc.CommitementId.Equals(joiningCode.CommitementId));

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
        joiningCode.SixDigitsCode = random.Next(Min_6_Ditgits, Min_7_Ditgits);
        joiningCode.CreateDate = DateTime.Now;
        await _joiningCodeRepository.CreateAsync(joiningCode);
        return joiningCode;
    }

    public async Task<JoiningCode> GetJoiningCode(int digits)
    {
        JoiningCode jc =  await _joiningCodeRepository.FirstOrDefaultAsync(jc =>
        jc.SixDigitsCode == digits);
        return jc ??
            throw new NotFoundException("Joining code is not exists or expired");
    }

    public void ValidateJoiningCode(JoiningCode joiningCode)
    {
        double timeSpan = DateTime.Now.Subtract(joiningCode.CreateDate).TotalMinutes;
        if (timeSpan > joiningCode.TimeSpan)
        {
            throw new BadRequestException("Joining code is not exists or expired");
        }
    }

    public async Task<CommitmentEntity> GetCommitment(JoiningCode joiningCode)
    {
        return await _commitmentCodeRepository.FindByIdAsync(joiningCode.CommitementId);
    }
}
