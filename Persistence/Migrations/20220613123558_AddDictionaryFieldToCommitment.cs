using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddDictionaryFieldToCommitment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompensationText",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HostelAddress",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaximumPeople",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumOfBathRooms",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumOfDoors",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumOfWCs",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumOfWindows",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerAddress",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerCitizenIdentity",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerDateOfBirth",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerName",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerPhone",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomArea",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomLength",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomName",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomPrice",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomPriceText",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomWidth",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TeantAddress",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenantCitizenIdentity",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenantDateOfBirth",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenantName",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenantPhone",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompensationText",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "HostelAddress",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "MaximumPeople",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "NumOfBathRooms",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "NumOfDoors",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "NumOfWCs",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "NumOfWindows",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "OwnerAddress",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "OwnerCitizenIdentity",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "OwnerDateOfBirth",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "OwnerName",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "OwnerPhone",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "RoomArea",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "RoomLength",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "RoomName",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "RoomPrice",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "RoomPriceText",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "RoomWidth",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TeantAddress",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantCitizenIdentity",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantDateOfBirth",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantName",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantPhone",
                table: "Commitments");
        }
    }
}
