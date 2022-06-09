using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class RevertLast24h : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitementId",
                table: "JoiningCodes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_ManagerId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "NotificationCode",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "ManagerId",
                table: "Notifications",
                newName: "TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_ManagerId",
                table: "Notifications",
                newName: "IX_Notifications_TransactionId");

            migrationBuilder.RenameColumn(
                name: "CommitementId",
                table: "JoiningCodes",
                newName: "CommitmentId");

            migrationBuilder.RenameIndex(
                name: "IX_JoiningCodes_CommitementId",
                table: "JoiningCodes",
                newName: "IX_JoiningCodes_CommitmentId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSent",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsUnread",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "NotificationTransaction",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HostelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationTransaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotificationTransaction_Hostels_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NotificationTransaction_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_NotificationTransaction_HostelId",
                table: "NotificationTransaction",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationTransaction_ManagerId",
                table: "NotificationTransaction",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitmentId",
                table: "JoiningCodes",
                column: "CommitmentId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_NotificationTransaction_TransactionId",
                table: "Notifications",
                column: "TransactionId",
                principalTable: "NotificationTransaction",
                principalColumn: "Id");

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
                name: "FK_JoiningCodes_Commitments_CommitmentId",
                table: "JoiningCodes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_NotificationTransaction_TransactionId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Rooms_RoomId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "NotificationTransaction");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsSent",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "IsUnread",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "Notifications",
                newName: "ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_TransactionId",
                table: "Notifications",
                newName: "IX_Notifications_ManagerId");

            migrationBuilder.RenameColumn(
                name: "CommitmentId",
                table: "JoiningCodes",
                newName: "CommitementId");

            migrationBuilder.RenameIndex(
                name: "IX_JoiningCodes_CommitmentId",
                table: "JoiningCodes",
                newName: "IX_JoiningCodes_CommitementId");

            migrationBuilder.AddColumn<string>(
                name: "NotificationCode",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitementId",
                table: "JoiningCodes",
                column: "CommitementId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
