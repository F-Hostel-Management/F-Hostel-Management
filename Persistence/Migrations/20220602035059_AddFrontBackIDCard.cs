using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddFrontBackIDCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Identification",
                table: "Users",
                newName: "FrontIdentification");

            migrationBuilder.AddColumn<string>(
                name: "BackIdentification",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackIdentification",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "FrontIdentification",
                table: "Users",
                newName: "Identification");
        }
    }
}
