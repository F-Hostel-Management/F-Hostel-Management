using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Domain.Extensions;

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
            OwnerDateOfBirth = owner.DateOfBirth,
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
            HostelAddress = hostel.Address,
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
            commitment.TenantDateOfBirth = tenant.DateOfBirth;
            commitment.TenantCitizenIdentity = tenant.CitizenIdentity;
            commitment.TenantAddress = tenant.Address;
            commitment.TenantPhone = tenant.Phone;
        };
        return commitment;
    }

    public async Task<string> GetCommitmentHtmlBase64(CommitmentEntity commitment, Guid userId)
    {
        CommitmentScaffolding commitmentScaffolding = await _commitmentScaffoldingRepository.FindByIdAsync(commitment.CommitmentScaffoldingId);
        string commitmentHtml = commitmentScaffolding.Content;
        var commitmentDictionary = await CommitmentDictionaryGenerator(commitment, userId);
        commitmentHtml = DecodeCommitmentHtml(commitmentDictionary, commitmentHtml);
        return commitmentHtml.EncodeBase64();
    }


    public string DecodeCommitmentHtml(Dictionary<string, string> commitmentDictionary, string commitmentHtml)
    {
        if (commitmentDictionary.Count == 0)
        {
            return commitmentHtml;
        }
        var first = commitmentDictionary.First();
        commitmentDictionary.Remove(first.Key);
        if (first.Value == null)
        {
            return DecodeCommitmentHtml(commitmentDictionary, commitmentHtml.Replace(first.Key, "Not Availabel"));
        }
        return DecodeCommitmentHtml(commitmentDictionary, commitmentHtml.Replace(first.Key, first.Value));
    }

    private async Task<Dictionary<string, string>> CommitmentDictionaryGenerator(CommitmentEntity commitment, Guid userId)
    {
        UserEntity user = await _userRepository.FindByIdAsync(userId);
        Dictionary<string, string> commitmentDictionary = new()
        {
            { "{tenantName}", commitment.TenantName },
            { "{tenantDateOfBirth}", commitment.TenantDateOfBirth.ToString("dd/MM/yyyy") },
            { "{tenantCitizenIdentity}", commitment.TenantCitizenIdentity },
            { "{teantAddress}", commitment.TenantAddress },
            { "{tenantPhone}", commitment.TenantPhone },

            { "{ownerName}", commitment.OwnerName },
            { "{ownerDateOfBirth}", commitment.OwnerDateOfBirth.ToString("dd/MM/yyyy") },
            { "{ownerCitizenIdentity}", commitment.OwnerCitizenIdentity },
            { "{ownerAddress}", commitment.OwnerAddress },
            { "{ownerPhone}", commitment.OwnerPhone },

            { "{createDay}", commitment.CreatedDate.ToString("dd") },
            { "{createMonth}", commitment.CreatedDate.ToString("MM") },
            { "{createYear}", commitment.CreatedDate.ToString("yyyy") },

            { "{hostelAddress}", commitment.HostelAddress },

            { "{roomName}", commitment.RoomName },
            { "{roomArea}", commitment.RoomArea },
            { "{roomLength}", commitment.RoomLength },
            { "{roomWidth}", commitment.RoomWidth },
            { "{numOfDoors}", commitment.NumOfDoors },
            { "{numOfWindows}", commitment.NumOfWindows },
            { "{numOfBathRooms}", commitment.NumOfBathRooms },
            { "{numOfWCs}", commitment.NumOfWCs },
            { "{maximumPeople}", commitment.MaximumPeople },

            { "{startDay}", commitment.StartDate.ToString("dd") },
            { "{startMonth}", commitment.StartDate.ToString("MM") },
            { "{startYear}", commitment.StartDate.ToString("yyyy") },

            { "{endDay}", commitment.EndDate.ToString("dd") },
            { "{endMonth}", commitment.EndDate.ToString("MM") },
            { "{endYear}", commitment.EndDate.ToString("yyyy") },

            { "{roomPrice}", commitment.Price.ToString() },
            { "{roomPriceText}", MoneyToTextConverter.VietnamesedongToTextConverter(commitment.Price) },

            { "{paymentDate}", commitment.PaymentDate.ToString() },

            { "{compensation}", commitment.Compensation.ToString() },
            { "{compensationText}", MoneyToTextConverter.VietnamesedongToTextConverter(commitment.Compensation) },

        };
        if (user.Role == Role.Tenant && !commitment.TenantId.Equals(userId))
        {
            commitmentDictionary["{tenantPhone}"] = commitment.TenantPhone.Mask(2, commitment.TenantPhone.Length - 2 - 2);
            commitmentDictionary["{tenantCitizenIdentity}"] = commitment.TenantCitizenIdentity.Mask(2, commitment.TenantCitizenIdentity.Length - 2 - 2);
            commitmentDictionary["{teantAddress}"] = null;
            commitmentDictionary["{tenantDateOfBirth}"] = "XX/XX/" + commitment.TenantDateOfBirth.ToString("yyyy"); ;
        }
        return commitmentDictionary;
    }
}
