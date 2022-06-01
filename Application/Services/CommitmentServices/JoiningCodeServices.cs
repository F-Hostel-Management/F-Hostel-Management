using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.Commitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CommitmentServices;

public class JoiningCodeServices : IJoiningCodeServices
{
    public readonly IGenericRepository<JoiningCode> _joiningCodeRepository;
    private readonly int Min_6_Ditgits = 100000;
    private readonly int Min_7_Ditgits = 1000000;


    public JoiningCodeServices(
        IGenericRepository<JoiningCode> joiningCodeRepository)
    {
        _joiningCodeRepository = joiningCodeRepository;
    }



    // datecreate, _6digit = null
    public async Task<JoiningCode> CreateJoiningCode(JoiningCode joiningCode)
    {
        Random random = new Random();
        /*int _6DigitCode = 0;
        JoiningCode checkedJc = null;
        do
        {
            _6DigitCode = random.Next(Min_6_Ditgits, Min_7_Ditgits);
            checkedJc = await _joiningCodeRepository.FirstOrDefaultAsync(
                jc => jc._6DigitCode == _6DigitCode
            );
        } while (checkedJc != null);*/
        joiningCode._6DigitCode = /*_6DigitCode*/ random.Next(Min_6_Ditgits, Min_7_Ditgits);
        joiningCode.CreateDate = DateTime.Now;
        await _joiningCodeRepository.CreateAsync(joiningCode);
        return joiningCode;
    }
}
