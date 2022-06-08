using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddTransactionOfNotification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_ManagerId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "TransactionCode",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "ManagerId",
                table: "Notifications",
                newName: "TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_ManagerId",
                table: "Notifications",
                newName: "IX_Notifications_TransactionId");

            migrationBuilder.CreateTable(
                name: "NotificationTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HostelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotificationTransactions_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NotificationTransactions_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_NotificationTransactions_HostelId",
                table: "NotificationTransactions",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationTransactions_ManagerId",
                table: "NotificationTransactions",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_NotificationTransactions_TransactionId",
                table: "Notifications",
                column: "TransactionId",
                principalTable: "NotificationTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_NotificationTransactions_TransactionId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "NotificationTransactions");

            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "Notifications",
                newName: "ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_TransactionId",
                table: "Notifications",
                newName: "IX_Notifications_ManagerId");

            migrationBuilder.AddColumn<string>(
                name: "TransactionCode",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_ManagerId",
                table: "Notifications",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
