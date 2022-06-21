using Api.Services;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Hostel;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;
using Infrastructure.Contexts;

namespace Api.Configurations.DabaseInittials;

public static class DatabaseInitializer
{
    private static readonly Random _rand = new();

    public static async Task InitializeAsync(ApplicationDbContext dbContext)
    {
        dbContext.Database.EnsureCreated();

        await dbContext.FeedUsers();

        await dbContext.FeedHostels();

        //await dbContext.FeedRoomTypes();

        await dbContext.FeedRooms();

        await dbContext.FeedTenantsToRoom();

    }

    public static async Task FeedUsers(this ApplicationDbContext dbContext)
    {
        if (dbContext.Users.Any()) return;

        dynamic users = SeedingServices.LoadJson("USERS_MOCK_DATA.json");
        // create Owners

        int usersLength = users.Count;
        for (int i = 0; i < 20; i++)
        {
            var mockUser = users[_rand.Next(usersLength)];
            await dbContext.Users.AddAsync(
                new UserEntity()
                {
                    Name = mockUser.Name,
                    Email = mockUser.Email,
                    Phone = mockUser.Phone,
                    Avatar = mockUser.Avatar,
                    DateOfBirth = mockUser.DateOfBirth,
                    OrganizationCode = mockUser.OrganizationCode,
                    TaxCode = mockUser.TaxCode,
                    Gender = (Gender)_rand.Next(3),
                    Role = (Role)_rand.Next(3),
                });
        }
        await dbContext.SaveChangesAsync();
        await dbContext.FeedOwnerToManagers();
    }

    public static async Task FeedOwnerToManagers(this ApplicationDbContext dbContext)
    {
        if (!dbContext.Users.Any()) return;
        var managers = dbContext.Users.Where(user => user.RoleString == Role.Manager.ToString()).ToArray();
        var owners = dbContext.Users.Where(user => user.RoleString == Role.Owner.ToString()).ToArray();
        if (!managers.Any() || !owners.Any())
        {
            return;
        }

        foreach (var manager in managers)
        {
            manager.Owner = owners[_rand.Next(owners.Length)];
        }
        await dbContext.SaveChangesAsync();
    }
    /*    public static async Task FeedRoomTypes(this ApplicationDbContext dbContext)
        {
            if (dbContext.RoomTypes.Any()) return;

            List<RoomType> _roomTypes = new List<RoomType>
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

            foreach (var roomType in _roomTypes)
            {
                await dbContext.RoomTypes.AddAsync(roomType);
            }
            await dbContext.SaveChangesAsync();
        }*/

    public static async Task FeedHostels(this ApplicationDbContext dbContext)
    {
        if (dbContext.Hostels.Any()) return;

        dynamic hostels = SeedingServices.LoadJson("HOSTELS_MOCK_DATA.json");
        int hostelsLength = hostels.Count;
        var owners = dbContext.Users.Where(user => user.RoleString == Role.Owner.ToString()).ToArray();

        for (int i = 0; i < 6; i++)
        {
            var mockHostel = hostels[_rand.Next(hostelsLength)];
            await dbContext.Hostels.AddAsync(
                new HostelEntity()
                {
                    Address = mockHostel.Address,
                    Name = mockHostel.Name,
                    NumOfRooms = mockHostel.NumOfRooms,
                    Owner = owners[_rand.Next(owners.Length)],
                    QrTimeSpan = _rand.Next(15, 30)
                });
        }
        await dbContext.SaveChangesAsync();
        await dbContext.FeedManagersToHostels();
    }

    public static async Task FeedManagersToHostels(this ApplicationDbContext dbContext)
    {
        var hostels = dbContext.Hostels.ToArray();
        var managers = dbContext.Users.Where(user =>
                        user.RoleString.Equals(Role.Manager.ToString())).ToArray();
        for (int i = 0; i < 20; i++)
        {
            await dbContext.HostelManagements.AddAsync(
                new HostelManagement()
                {
                    Hostel = hostels[_rand.Next(hostels.Length)],
                    Manager = managers[_rand.Next(managers.Length)],
                }); ;
        }
        await dbContext.SaveChangesAsync();
    }

    public static async Task FeedRooms(this ApplicationDbContext dbContext)
    {
        if (dbContext.Rooms.Any()) return;

        dynamic rooms = SeedingServices.LoadJson("ROOMS_MOCK_DATA.json");
        var hostels = dbContext.Hostels.ToArray();
        //var _roomTypes = dbContext.RoomTypes.ToArray();
        int roomLength = rooms.Count;
        for (int i = 0; i < 20; i++)
        {
            var mockRoom = rooms[_rand.Next(roomLength)];
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
                    NumOfBedRooms = _rand.Next(5),
                    //RoomType = _roomTypes[_rand.Next(_roomTypes.Length)],
                    Hostel = hostels[_rand.Next(hostels.Length)],
                    RoomStatus = (RoomStatus)1,
                    MaximumPeople = _rand.Next(2, 10)
                });
        }
        await dbContext.SaveChangesAsync();
    }



    public static async Task FeedTenantsToRoom(this ApplicationDbContext dbContext)
    {
        if (!dbContext.Users.Any() || !dbContext.Rooms.Any()) return;

        if (dbContext.Commitments.Any()) return;

        var rooms = dbContext.Rooms.ToArray();
        var tenants = dbContext.Users.Where(user => user.RoleString == Role.Tenant.ToString()).ToArray();
        var owners = dbContext.Users.Where(user => user.RoleString == Role.Owner.ToString());
        int code = 1;
        foreach (var tenant in tenants)
        {
            var room = rooms[_rand.Next(rooms.Length)];
            UserEntity owner = owners.FirstOrDefault(owner => owner.Id.Equals(dbContext.Hostels.FirstOrDefault(hostel => hostel.Id.Equals(room.HostelId)).OwnerId));
            // create commitment
            CommitmentEntity com = new()
            {
                Price = _rand.Next(3000, 4000),
                Owner = owner,
                Room = room,
                HostelId = room.HostelId,
                CreatedDate = DateTime.Now,
                StartDate = DateTime.Now,
                EndDate = DateTime.Parse("22 Jun 2023 14:20:00"),
                CommitmentStatus = CommitmentStatus.Active,
                PaymentDate = _rand.Next(32),
                CommitmentCode = "DTN" + code++,
            };
            await dbContext.Commitments.AddAsync(com);


            // tenant into room
            await dbContext.RoomTenants.AddAsync(
                new RoomTenant()
                {
                    TenantId = tenant.Id,
                    RoomId = room.Id,
                    CommitmentId = com.Id
                });

            // update room status
            room.RoomStatus = 0;

        }
        await dbContext.SaveChangesAsync();
    }
}
