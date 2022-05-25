using Api.Services;
using Domain.Entities;
using Domain.Entities.Room;
using Domain.Enums;
using Infrastructure.Contexts;

namespace Api.Configurations;

public static class DatabaseInitializer
{
    private static List<HostelCategory> _hostelCategories = new List<HostelCategory>
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
    private static List<RoomType> _roomTypes = new List<RoomType>
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

    private static Random rand = new Random();

    public static async Task InitializeAsync(ApplicationDbContext dbContext)
    {
        dbContext.Database.EnsureCreated();
        if (!dbContext.Users.Any())
        {
            await dbContext.FeedUsers();
        }

        if (!dbContext.HostelCategories.Any())
        {
            await dbContext.FeedHostelCategories();
        }

        if (!dbContext.Hostels.Any())
        {
            await dbContext.FeedHostels();
        }

        if (!dbContext.RoomTypes.Any())
        {
            await dbContext.FeedRoomTypes();
        }

        if (!dbContext.Rooms.Any())
        {
            await dbContext.FeedRooms();
        }

        if (dbContext.Users.Any() && dbContext.Rooms.Any())
        {
            await dbContext.FeedTenantsToRoom();
        }
    }
    public static async Task FeedUsers(this ApplicationDbContext dbContext)
    {
        dynamic _users = SeedingServices.LoadJson("USERS_MOCK_DATA.json");
        // create Owners

        int usersLength = _users.Count;
        for (int i = 0; i < 100; i++)
        {
            var mockUser = _users[rand.Next(usersLength)];
            await dbContext.Users.AddAsync(
                new UserEntity()
                {
                    Name = mockUser.Name,
                    Email = mockUser.Email,
                    Phone = mockUser.Phone,
                    Password = mockUser.Password,
                    Avatar = mockUser.Avatar,
                    DateOfBirth = mockUser.DateOfBirth,
                    OrganizationCode = mockUser.OrganizationCode,
                    TaxCode = mockUser.TaxCode,
                    Gender = (Gender)rand.Next(3),
                    Role = (Role)rand.Next(3),
                });
        }
        await dbContext.SaveChangesAsync();
    }
    public static async Task FeedRoomTypes(this ApplicationDbContext dbContext)
    {
        foreach (var roomType in _roomTypes)
        {
            await dbContext.RoomTypes.AddAsync(roomType);
        }
        await dbContext.SaveChangesAsync();
    }
    public static async Task FeedHostelCategories(this ApplicationDbContext dbContext)
    {
        foreach (var hostelCategory in _hostelCategories)
        {
            await dbContext.HostelCategories.AddAsync(hostelCategory);
        }
        await dbContext.SaveChangesAsync();
    }

    public static async Task FeedHostels(this ApplicationDbContext dbContext)
    {
        dynamic _hostels = SeedingServices.LoadJson("HOSTELS_MOCK_DATA.json");
        int hostelsLength = _hostels.Count;
        var owners = dbContext.Users.Where(user => user.RoleString == Role.Owner.ToString()).ToArray();
        var hostelCategories = dbContext.HostelCategories.ToArray();

        for (int i = 0; i < 100; i++)
        {
            var mockHostel = _hostels[rand.Next(hostelsLength)];
            await dbContext.Hostels.AddAsync(
                new HostelEntity()
                {
                    Address = mockHostel.Address,
                    Name = mockHostel.Name,
                    NumOfRooms = mockHostel.NumOfRooms,
                    HostelCategory = hostelCategories[rand.Next(hostelCategories.Length)],
                    Owner = owners[rand.Next(owners.Length)],
                });
        }
        await dbContext.SaveChangesAsync();
    }

    public static async Task FeedRooms(this ApplicationDbContext dbContext)
    {
        dynamic _rooms = SeedingServices.LoadJson("ROOMS_MOCK_DATA.json");
        var _hostels = dbContext.Hostels.ToArray();
        var _roomTypes = dbContext.RoomTypes.ToArray();
        int roomLength = _rooms.Count;
        for (int i = 0; i < 100; i++)
        {
            var mockRoom = _rooms[rand.Next(roomLength)];
            await dbContext.Rooms.AddAsync(
                new RoomEntity()
                {
                    Area = mockRoom.Area,
                    Height = mockRoom.Height,
                    Length = mockRoom.Length,
                    Width = mockRoom.Width,
                    RoomName = mockRoom.RoomName,
                    NumOfBathRooms = mockRoom.NumOfBathRooms,
                    NumOfDoors = mockRoom.NumOfDoors,
                    NumOfWCs = mockRoom.NumOfWCs,
                    NumOfWindows = mockRoom.NumOfWindows,
                    Price = mockRoom.Price,
                    RoomType = _roomTypes[rand.Next(_roomTypes.Length)],
                    Hostel = _hostels[rand.Next(_hostels.Length)]
                });
        }
        await dbContext.SaveChangesAsync();
    }

    public static async Task FeedTenantsToRoom(this ApplicationDbContext dbContext)
    {
        var _room = dbContext.Rooms.ToArray();
        var tenants = dbContext.Users.Where(user => user.RoleString == Role.Tenant.ToString()).ToArray();
        foreach(var tenant in tenants)
        {
            tenant.Room = _room[rand.Next(_room.Length)];
        }
        await dbContext.SaveChangesAsync();
    }
}
