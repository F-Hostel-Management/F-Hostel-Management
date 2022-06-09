using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class change_user_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.AddColumn<string>(
            //     name: "Address",
            //     table: "Users",
            //     type: "nvarchar(max)",
            //     nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropColumn(
            //     name: "Address",
            //     table: "Users");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Users");
        }
    }
}
