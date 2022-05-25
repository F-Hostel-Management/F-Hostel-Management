using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class StadardizeTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitment_Room_RoomId",
                table: "Commitment");

            migrationBuilder.DropForeignKey(
                name: "FK_Commitment_Users_ManagerId",
                table: "Commitment");

            migrationBuilder.DropForeignKey(
                name: "FK_CommitmentContains_Commitment_CommitmentId",
                table: "CommitmentContains");

            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Room_RoomId",
                table: "Facilities");

            migrationBuilder.DropForeignKey(
                name: "FK_Hostel_HostelCategory_HostelCategoryId",
                table: "Hostel");

            migrationBuilder.DropForeignKey(
                name: "FK_Hostel_Users_OwnerId",
                table: "Hostel");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelManagent_Hostel_HostelId",
                table: "HostelManagent");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelManagent_Users_ManagerId",
                table: "HostelManagent");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_InvoiceTypes_InvoiceTypeId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Room_RoomId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Users_ManagerId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Users_TenantPaidId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceSchedules_Room_RoomId",
                table: "InvoiceSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Notification_NotificationCategory_NotificationCategoryId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_Hostel_HostelId",
                table: "Room");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_RoomTypes_RoomTypeId",
                table: "Room");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomNotification_Notification_NotificationId",
                table: "RoomNotification");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomNotification_Room_RoomId",
                table: "RoomNotification");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomNotification_Users_ManagerId",
                table: "RoomNotification");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Room_RoomId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Room_RoomId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomNotification",
                table: "RoomNotification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room",
                table: "Room");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NotificationCategory",
                table: "NotificationCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notification",
                table: "Notification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoice",
                table: "Invoice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelManagent",
                table: "HostelManagent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelCategory",
                table: "HostelCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hostel",
                table: "Hostel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Commitment",
                table: "Commitment");

            migrationBuilder.RenameTable(
                name: "RoomNotification",
                newName: "RoomNotifications");

            migrationBuilder.RenameTable(
                name: "Room",
                newName: "Rooms");

            migrationBuilder.RenameTable(
                name: "NotificationCategory",
                newName: "NotificationCategories");

            migrationBuilder.RenameTable(
                name: "Notification",
                newName: "Notifications");

            migrationBuilder.RenameTable(
                name: "Invoice",
                newName: "Invoices");

            migrationBuilder.RenameTable(
                name: "HostelManagent",
                newName: "HostelManagents");

            migrationBuilder.RenameTable(
                name: "HostelCategory",
                newName: "HostelCategories");

            migrationBuilder.RenameTable(
                name: "Hostel",
                newName: "Hostels");

            migrationBuilder.RenameTable(
                name: "Commitment",
                newName: "Commitments");

            migrationBuilder.RenameIndex(
                name: "IX_RoomNotification_RoomId",
                table: "RoomNotifications",
                newName: "IX_RoomNotifications_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomNotification_NotificationId",
                table: "RoomNotifications",
                newName: "IX_RoomNotifications_NotificationId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomNotification_ManagerId",
                table: "RoomNotifications",
                newName: "IX_RoomNotifications_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Room_RoomTypeId",
                table: "Rooms",
                newName: "IX_Rooms_RoomTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Room_HostelId",
                table: "Rooms",
                newName: "IX_Rooms_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_Notification_NotificationCategoryId",
                table: "Notifications",
                newName: "IX_Notifications_NotificationCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_TenantPaidId",
                table: "Invoices",
                newName: "IX_Invoices_TenantPaidId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_RoomId",
                table: "Invoices",
                newName: "IX_Invoices_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_ManagerId",
                table: "Invoices",
                newName: "IX_Invoices_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoice_InvoiceTypeId",
                table: "Invoices",
                newName: "IX_Invoices_InvoiceTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelManagent_ManagerId",
                table: "HostelManagents",
                newName: "IX_HostelManagents_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelManagent_HostelId",
                table: "HostelManagents",
                newName: "IX_HostelManagents_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_Hostel_OwnerId",
                table: "Hostels",
                newName: "IX_Hostels_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Hostel_HostelCategoryId",
                table: "Hostels",
                newName: "IX_Hostels_HostelCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Commitment_RoomId",
                table: "Commitments",
                newName: "IX_Commitments_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Commitment_ManagerId",
                table: "Commitments",
                newName: "IX_Commitments_ManagerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomNotifications",
                table: "RoomNotifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rooms",
                table: "Rooms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NotificationCategories",
                table: "NotificationCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notifications",
                table: "Notifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelManagents",
                table: "HostelManagents",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelCategories",
                table: "HostelCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hostels",
                table: "Hostels",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Commitments",
                table: "Commitments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CommitmentContains_Commitments_CommitmentId",
                table: "CommitmentContains",
                column: "CommitmentId",
                principalTable: "Commitments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_Rooms_RoomId",
                table: "Commitments",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_Users_ManagerId",
                table: "Commitments",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Rooms_RoomId",
                table: "Facilities",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HostelManagents_Hostels_HostelId",
                table: "HostelManagents",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelManagents_Users_ManagerId",
                table: "HostelManagents",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Hostels_HostelCategories_HostelCategoryId",
                table: "Hostels",
                column: "HostelCategoryId",
                principalTable: "HostelCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Hostels_Users_OwnerId",
                table: "Hostels",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_InvoiceTypes_InvoiceTypeId",
                table: "Invoices",
                column: "InvoiceTypeId",
                principalTable: "InvoiceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Rooms_RoomId",
                table: "Invoices",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Users_ManagerId",
                table: "Invoices",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Users_TenantPaidId",
                table: "Invoices",
                column: "TenantPaidId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceSchedules_Rooms_RoomId",
                table: "InvoiceSchedules",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_NotificationCategories_NotificationCategoryId",
                table: "Notifications",
                column: "NotificationCategoryId",
                principalTable: "NotificationCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomNotifications_Notifications_NotificationId",
                table: "RoomNotifications",
                column: "NotificationId",
                principalTable: "Notifications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomNotifications_Rooms_RoomId",
                table: "RoomNotifications",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomNotifications_Users_ManagerId",
                table: "RoomNotifications",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Hostels_HostelId",
                table: "Rooms",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_RoomTypes_RoomTypeId",
                table: "Rooms",
                column: "RoomTypeId",
                principalTable: "RoomTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Rooms_RoomId",
                table: "Tickets",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Rooms_RoomId",
                table: "Users",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommitmentContains_Commitments_CommitmentId",
                table: "CommitmentContains");

            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_Rooms_RoomId",
                table: "Commitments");

            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_Users_ManagerId",
                table: "Commitments");

            migrationBuilder.DropForeignKey(
                name: "FK_Facilities_Rooms_RoomId",
                table: "Facilities");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelManagents_Hostels_HostelId",
                table: "HostelManagents");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelManagents_Users_ManagerId",
                table: "HostelManagents");

            migrationBuilder.DropForeignKey(
                name: "FK_Hostels_HostelCategories_HostelCategoryId",
                table: "Hostels");

            migrationBuilder.DropForeignKey(
                name: "FK_Hostels_Users_OwnerId",
                table: "Hostels");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_InvoiceTypes_InvoiceTypeId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Rooms_RoomId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Users_ManagerId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Users_TenantPaidId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceSchedules_Rooms_RoomId",
                table: "InvoiceSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_NotificationCategories_NotificationCategoryId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomNotifications_Notifications_NotificationId",
                table: "RoomNotifications");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomNotifications_Rooms_RoomId",
                table: "RoomNotifications");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomNotifications_Users_ManagerId",
                table: "RoomNotifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Hostels_HostelId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_RoomTypes_RoomTypeId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Rooms_RoomId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Rooms_RoomId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rooms",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomNotifications",
                table: "RoomNotifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notifications",
                table: "Notifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NotificationCategories",
                table: "NotificationCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hostels",
                table: "Hostels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelManagents",
                table: "HostelManagents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelCategories",
                table: "HostelCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Commitments",
                table: "Commitments");

            migrationBuilder.RenameTable(
                name: "Rooms",
                newName: "Room");

            migrationBuilder.RenameTable(
                name: "RoomNotifications",
                newName: "RoomNotification");

            migrationBuilder.RenameTable(
                name: "Notifications",
                newName: "Notification");

            migrationBuilder.RenameTable(
                name: "NotificationCategories",
                newName: "NotificationCategory");

            migrationBuilder.RenameTable(
                name: "Invoices",
                newName: "Invoice");

            migrationBuilder.RenameTable(
                name: "Hostels",
                newName: "Hostel");

            migrationBuilder.RenameTable(
                name: "HostelManagents",
                newName: "HostelManagent");

            migrationBuilder.RenameTable(
                name: "HostelCategories",
                newName: "HostelCategory");

            migrationBuilder.RenameTable(
                name: "Commitments",
                newName: "Commitment");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_RoomTypeId",
                table: "Room",
                newName: "IX_Room_RoomTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_HostelId",
                table: "Room",
                newName: "IX_Room_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomNotifications_RoomId",
                table: "RoomNotification",
                newName: "IX_RoomNotification_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomNotifications_NotificationId",
                table: "RoomNotification",
                newName: "IX_RoomNotification_NotificationId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomNotifications_ManagerId",
                table: "RoomNotification",
                newName: "IX_RoomNotification_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_NotificationCategoryId",
                table: "Notification",
                newName: "IX_Notification_NotificationCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoices_TenantPaidId",
                table: "Invoice",
                newName: "IX_Invoice_TenantPaidId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoices_RoomId",
                table: "Invoice",
                newName: "IX_Invoice_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoices_ManagerId",
                table: "Invoice",
                newName: "IX_Invoice_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Invoices_InvoiceTypeId",
                table: "Invoice",
                newName: "IX_Invoice_InvoiceTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Hostels_OwnerId",
                table: "Hostel",
                newName: "IX_Hostel_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Hostels_HostelCategoryId",
                table: "Hostel",
                newName: "IX_Hostel_HostelCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelManagents_ManagerId",
                table: "HostelManagent",
                newName: "IX_HostelManagent_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelManagents_HostelId",
                table: "HostelManagent",
                newName: "IX_HostelManagent_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_Commitments_RoomId",
                table: "Commitment",
                newName: "IX_Commitment_RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Commitments_ManagerId",
                table: "Commitment",
                newName: "IX_Commitment_ManagerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room",
                table: "Room",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomNotification",
                table: "RoomNotification",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notification",
                table: "Notification",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NotificationCategory",
                table: "NotificationCategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoice",
                table: "Invoice",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hostel",
                table: "Hostel",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelManagent",
                table: "HostelManagent",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelCategory",
                table: "HostelCategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Commitment",
                table: "Commitment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitment_Room_RoomId",
                table: "Commitment",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitment_Users_ManagerId",
                table: "Commitment",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CommitmentContains_Commitment_CommitmentId",
                table: "CommitmentContains",
                column: "CommitmentId",
                principalTable: "Commitment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Facilities_Room_RoomId",
                table: "Facilities",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Hostel_HostelCategory_HostelCategoryId",
                table: "Hostel",
                column: "HostelCategoryId",
                principalTable: "HostelCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Hostel_Users_OwnerId",
                table: "Hostel",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HostelManagent_Hostel_HostelId",
                table: "HostelManagent",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelManagent_Users_ManagerId",
                table: "HostelManagent",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_InvoiceTypes_InvoiceTypeId",
                table: "Invoice",
                column: "InvoiceTypeId",
                principalTable: "InvoiceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Room_RoomId",
                table: "Invoice",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Users_ManagerId",
                table: "Invoice",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Users_TenantPaidId",
                table: "Invoice",
                column: "TenantPaidId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceSchedules_Room_RoomId",
                table: "InvoiceSchedules",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_NotificationCategory_NotificationCategoryId",
                table: "Notification",
                column: "NotificationCategoryId",
                principalTable: "NotificationCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Hostel_HostelId",
                table: "Room",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_RoomTypes_RoomTypeId",
                table: "Room",
                column: "RoomTypeId",
                principalTable: "RoomTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomNotification_Notification_NotificationId",
                table: "RoomNotification",
                column: "NotificationId",
                principalTable: "Notification",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomNotification_Room_RoomId",
                table: "RoomNotification",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomNotification_Users_ManagerId",
                table: "RoomNotification",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Room_RoomId",
                table: "Tickets",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Room_RoomId",
                table: "Users",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "Id");
        }
    }
}
