using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddCommitmentStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RoomStatus",
                table: "Rooms",
                newName: "Room Status");

            migrationBuilder.AddColumn<string>(
                name: "Commitment Status",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Commitment Status",
                table: "Commitments");

            migrationBuilder.RenameColumn(
                name: "Room Status",
                table: "Rooms",
                newName: "RoomStatus");
        }
    }
}
