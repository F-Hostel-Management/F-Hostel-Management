using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;

namespace Api.Services;

public class HandleCommitmentRequestService
{
    private readonly IGenericRepository<CommitmentScaffolding> _commitmentScaffoldingRepository;
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly ICommitmentServices _commitmentServices;


    public HandleCommitmentRequestService
        (IGenericRepository<CommitmentScaffolding> commitmentScaffoldingRepository,
        ICommitmentServices commitmentServices,
        IGenericRepository<UserEntity> userRepository)
    {
        _commitmentScaffoldingRepository = commitmentScaffoldingRepository;
        _commitmentServices = commitmentServices;
        _userRepository = userRepository;
    }
    public async Task<CommitmentEntity> FillCommitmentForOwner
        (CreateCommitmentRequest req, HostelEntity hostel, RoomEntity room, IMapper Mapper)
    {
        CommitmentScaffolding commitmentScaffolding = await _commitmentScaffoldingRepository.FirstOrDefaultAsync(cs => true);
        UserEntity owner = await _userRepository.FindByIdAsync(hostel.OwnerId);
        int code = await _commitmentServices.CountCommitmentByHostel(hostel.Id) + 1;

        CommitmentEntity commitment = new()
        {
            CommitmentScaffoldingId = commitmentScaffolding.Id,
            OwnerId = hostel.OwnerId,
            HostelId = hostel.Id,
            CreatedDate = DateTime.Now,
            CommitmentCode = "F-" + code,

            // fill dictionary for owner
            OwnerName = owner.Name,
            OwnerDateOfBirth = owner.DateOfBirth.ToString(),
            OwnerCitizenIdentity = owner.CitizenIdentity,
            OwnerAddress = owner.Address,
            OwnerPhone = owner.Phone,

            RoomName = room.RoomName,
            RoomArea = room.Area.ToString(),
            RoomLength = room.Length.ToString(),
            RoomWidth = room.Width.ToString(),
            NumOfDoors = room.NumOfDoors.ToString(),
            NumOfBathRooms = room.NumOfBathRooms.ToString(),
            NumOfWCs = room.NumOfWCs.ToString(),
            NumOfWindows = room.NumOfWindows.ToString(),
            MaximumPeople = room.MaximumPeople.ToString(),
            RoomPriceText = "RoomPriceText",
            HostelAddress = hostel.Address,
            CompensationText = "CompensationText",
        };
        Mapper.Map(req, commitment);
        return commitment;
    }

    public async Task<CommitmentEntity> FillCommitmentForTenant
        (CommitmentEntity commitment, Guid tenantId, IMapper Mapper)
    {
        UserEntity tenant = await _userRepository.FindByIdAsync(tenantId);
        {
            commitment.TenantId = tenantId;
            commitment.TenantName = tenant.Name;
            commitment.TenantDateOfBirth = tenant.DateOfBirth.ToString();
            commitment.TenantCitizenIdentity = tenant.CitizenIdentity;
            commitment.TeantAddress = tenant.Address;
            commitment.TenantPhone = tenant.Phone;
        };
        return commitment;
    }
}
