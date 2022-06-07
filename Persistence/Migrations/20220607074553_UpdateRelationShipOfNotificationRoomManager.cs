using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class UpdateRelationShipOfNotificationRoomManager : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_NotificationCategories_NotificationCategoryId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "NotificationCategories");

            migrationBuilder.DropTable(
                name: "RoomNotifications");

            migrationBuilder.RenameColumn(
                name: "NotificationCategoryId",
                table: "Notifications",
                newName: "RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_NotificationCategoryId",
                table: "Notifications",
                newName: "IX_Notifications_RoomId");

            migrationBuilder.AddColumn<Guid>(
                name: "ManagerId",
                table: "Notifications",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ManagerId",
                table: "Notifications",
                column: "ManagerId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_ManagerId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ManagerId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                table: "Notifications",
                newName: "NotificationCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_RoomId",
                table: "Notifications",
                newName: "IX_Notifications_NotificationCategoryId");

            migrationBuilder.CreateTable(
                name: "NotificationCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomNotifications",
                columns: table => new
                {
                    ManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NotificationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomNotifications_Notifications_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notifications",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RoomNotifications_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RoomNotifications_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomNotifications_ManagerId",
                table: "RoomNotifications",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomNotifications_NotificationId",
                table: "RoomNotifications",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomNotifications_RoomId",
                table: "RoomNotifications",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_NotificationCategories_NotificationCategoryId",
                table: "Notifications",
                column: "NotificationCategoryId",
                principalTable: "NotificationCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
