using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Entities.Commitment;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Services.CommitmentServices;


public class CommitmentServices : ICommitmentServices
{
    public readonly IGenericRepository<CommitmentEntity> _commitmentRepository;
    public readonly IGenericRepository<CommitmentImages> _commitmentImagesRepository;
    private readonly ICloudStorage _cloudStorage;

    public CommitmentServices(
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IGenericRepository<CommitmentImages> commitmentImagesRepository,
        ICloudStorage cloudStorage
        )
    {
        _commitmentRepository = commitmentRepository;
        _commitmentImagesRepository = commitmentImagesRepository;
        _cloudStorage = cloudStorage;
    }

    public async Task CreateCommitment(CommitmentEntity commitment)
    {
        commitment.CommitmentStatus = CommitmentStatus.Active;
        await _commitmentRepository.CreateAsync(commitment);
    }

    public async Task<CommitmentEntity> GetNotExpiredCommitmentByRoom(Guid roomId)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.RoomId.Equals(roomId)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
        return com ??
           throw new NotFoundException("Commitment Not Found Or Already Expired");
    }

    public async Task<IList<CommitmentEntity>> GetCommitmentsForTenant(Guid roomId, Guid tenantId)
    {

        var coms = await _commitmentRepository.WhereAsync(com =>
            com.RoomTenants.Where(rt =>
            rt.TenantId.Equals(tenantId) && rt.RoomId.Equals(roomId)).Any(), "RoomTenants");
        return coms;
    }

    public async Task<CommitmentEntity> GetCommitment(Guid commitmentId)
    {
        CommitmentEntity com = await _commitmentRepository.FindByIdAsync(commitmentId);
        return com ??
          throw new NotFoundException("Commitment Not Found Or Already Expired");

    }

    public async Task<CommitmentEntity> GetCommitment(Guid Id, CommitmentStatus status)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && com.Status.Equals(status.ToString())
            );
        return com ??
            throw new NotFoundException("Commitment Not Found");
    }

    public async Task<int> CountCommitmentByHostel(Guid hostelId)
    {
        var list = await _commitmentRepository.WhereAsync(com =>
        com.HostelId.Equals(hostelId));
        return list.Count;
    }

    public async Task<CommitmentEntity> GetLatestCommitmentByRoom(Guid roomId)
    {
        var commitments = (await _commitmentRepository.WhereAsync(c =>
            c.RoomId.Equals(roomId))).OrderByDescending(com => com.EndDate);

        if (!commitments.Any())
        {
            throw new NotFoundException("Commitment not found");
        }
        return commitments.First();
    }

    public async Task<ICollection<CommitmentImages>> UploadCommitment(CommitmentEntity commitment, List<IFormFile> imgFormFiles)
    {
        ICollection<CommitmentImages> images = new List<CommitmentImages>();
        for (int i = 0; i < imgFormFiles.Count; i++)
        {
            string fileNameForStorage = FilePathUtil.FormFileName($"C{i}_" + commitment.Id.ToString(), imgFormFiles[i].FileName);
            var imgUrl = await _cloudStorage.UploadFileAsync(imgFormFiles[i], fileNameForStorage);
            images.Add(new CommitmentImages()
            {
                ImgUrl = imgUrl,
                CommitmentId = commitment.Id
            });
        }
        return images;
    }

    public async Task DeleteCommitmentImage(CommitmentImages target)
    {
        if (!string.IsNullOrEmpty(target.ImgUrl))
            _ = _cloudStorage.DeleteFileAsync(target.ImgUrl);
        await _commitmentImagesRepository.DeleteSoftAsync(target);
    }
}
