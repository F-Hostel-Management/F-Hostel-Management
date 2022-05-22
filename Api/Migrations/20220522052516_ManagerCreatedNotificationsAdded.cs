using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class ManagerCreatedNotificationsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostelManagent_Hostel_HostelId",
                table: "HostelManagent");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_InvoiceType_InvoiceTypeId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceSchedules_InvoiceType_InvoiceTypeId",
                table: "InvoiceSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceType",
                table: "InvoiceType");

            migrationBuilder.RenameTable(
                name: "InvoiceType",
                newName: "InvoiceTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceTypes",
                table: "InvoiceTypes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "RoomNotification",
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
                    table.PrimaryKey("PK_RoomNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomNotification_Notification_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notification",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RoomNotification_Room_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Room",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RoomNotification_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomNotification_ManagerId",
                table: "RoomNotification",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomNotification_NotificationId",
                table: "RoomNotification",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomNotification_RoomId",
                table: "RoomNotification",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelManagent_Hostel_HostelId",
                table: "HostelManagent",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_InvoiceTypes_InvoiceTypeId",
                table: "Invoice",
                column: "InvoiceTypeId",
                principalTable: "InvoiceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceSchedules_InvoiceTypes_InvoiceTypeId",
                table: "InvoiceSchedules",
                column: "InvoiceTypeId",
                principalTable: "InvoiceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostelManagent_Hostel_HostelId",
                table: "HostelManagent");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_InvoiceTypes_InvoiceTypeId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceSchedules_InvoiceTypes_InvoiceTypeId",
                table: "InvoiceSchedules");

            migrationBuilder.DropTable(
                name: "RoomNotification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceTypes",
                table: "InvoiceTypes");

            migrationBuilder.RenameTable(
                name: "InvoiceTypes",
                newName: "InvoiceType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceType",
                table: "InvoiceType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelManagent_Hostel_HostelId",
                table: "HostelManagent",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_InvoiceType_InvoiceTypeId",
                table: "Invoice",
                column: "InvoiceTypeId",
                principalTable: "InvoiceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceSchedules_InvoiceType_InvoiceTypeId",
                table: "InvoiceSchedules",
                column: "InvoiceTypeId",
                principalTable: "InvoiceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
