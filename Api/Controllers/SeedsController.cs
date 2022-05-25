using Api.Services;
using Api.UserFeatures.Requests;
using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Mvc;
using Domain.Enums;
using Persistence.Repositories;

namespace Api.Controllers;
public class SeedsController : BaseApiController
{

    private readonly GenericRepository<UserEntity> _userRepository;
    private readonly GenericRepository<HostelEntity> _hostelRepository;
    private readonly GenericRepository<RoomEntity> _roomRepository;
    private readonly GenericRepository<RoomType> _roomTypeRepository;
    private readonly GenericRepository<HostelCategory> _hostelCategoryRepository;

    private List<HostelCategory> _hostelCategories = new List<HostelCategory>
    {
        new HostelCategory(){ CategoryName =  "Cheap Hostel"},
        new HostelCategory(){ CategoryName =  "Regular Hostel"},
        new HostelCategory(){ CategoryName =  "Homely Hostel"},
        new HostelCategory(){ CategoryName =  "Family Hostel"},
        new HostelCategory(){ CategoryName =  "Eco Hostel"},
        new HostelCategory(){ CategoryName =  "Beach Hostel"},
        new HostelCategory(){ CategoryName =  "Surf Hostel"},
        new HostelCategory(){ CategoryName =  "Party Hostel"},
        new HostelCategory(){ CategoryName =  "Luxury ⁄ Boutique ⁄ Design Hostel"},
        new HostelCategory(){ CategoryName =  "Historic Hostel"},
    };
    private List<RoomType> _roomTypes = new List<RoomType>
    {
        new RoomType(){ CategoryName = "Studio"},
        new RoomType(){ CategoryName = "Library"},
        new RoomType(){ CategoryName = "BathRoom"},
        new RoomType(){ CategoryName = "Office"},
        new RoomType(){ CategoryName = "Singl3"},
        new RoomType(){ CategoryName = "Doubl3"},
        new RoomType(){ CategoryName = "Strippl3"},
        new RoomType(){ CategoryName = "Quad"},
        new RoomType(){ CategoryName = "Queen"},
        new RoomType(){ CategoryName = "King"},
        new RoomType(){ CategoryName = "Twin"},
    };

    private dynamic _users = SeedingServices.LoadJson("USER_MOCK_DATA.json");
    public SeedsController(
        GenericRepository<UserEntity> userRepository,
        GenericRepository<HostelEntity> hostelRepository,
        GenericRepository<RoomEntity> roomRepository,
        GenericRepository<RoomType> roomTypeRepository,
        GenericRepository<HostelCategory> hostelCategoryRepository
        )
    {
        _userRepository = userRepository;
        _hostelRepository = hostelRepository;
        _roomRepository = roomRepository;
        _roomTypeRepository = roomTypeRepository;
        _hostelCategoryRepository = hostelCategoryRepository;

    }

    // create Owners
    [HttpPost("feed-users")]
    public async Task<IActionResult> FeedUsers(UserFeedingRequest request)
    {
        var rand = new Random();
        int length = _users.Count;
        for (int i = 0; i < request.Quantity; i++)
        {
            var mockUser = _users[rand.Next(0, length)];
            await _userRepository.CreateAsync(
                new UserEntity()
                {
                    Name = mockUser.Name,
                    Email = mockUser.Email,
                    Phone = mockUser.Phone,
                    //Password = mockUser.Password,
                    Avatar = mockUser.Avatar,
                    DateOfBirth = mockUser.DateOfBirth,
                    OrganizationCode = mockUser.OrganizationCode,
                    TaxCode = mockUser.TaxCode,
                    Gender = (Gender)rand.Next(0, 2),
                    Role = request.Role,
                });
        }
        return Ok();
    }

    // cateory for hostel
    [HttpPost("feed-hostel-categories")]
    public async Task<IActionResult> FeedHostelCategories()
    {
        foreach (var hostelCategory in _hostelCategories)
        {
            await _hostelCategoryRepository.CreateAsync(hostelCategory);
        }
        return Ok();
    }

    // add hostel

    // category for room
    [HttpPost("feed-room-types")]
    public async Task<IActionResult> FeedRoomTypes()
    {
        foreach (var roomType in _roomTypes)
        {
            await _roomTypeRepository.CreateAsync(roomType);
        }
        return Ok();
    }

    // add room

    // add tenants to rooms
}
