using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class CreateTransactionCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NotificationCode",
                table: "Notifications",
                newName: "TransactionCode");

            migrationBuilder.AddColumn<bool>(
                name: "IsUnread",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUnread",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "TransactionCode",
                table: "Notifications",
                newName: "NotificationCode");
        }
    }
}
