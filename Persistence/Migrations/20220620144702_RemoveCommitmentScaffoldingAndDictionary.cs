using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class RemoveCommitmentScaffoldingAndDictionary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_CommitmentScaffoldings_CommitmentScaffoldingId",
                table: "Commitments");

            migrationBuilder.DropTable(
                name: "CommitmentScaffoldings");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_CommitmentScaffoldingId",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "CanModify",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "CommitmentScaffoldingId",
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
                name: "RoomWidth",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantAddress",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CanModify",
                table: "Commitments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "CommitmentScaffoldingId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

            migrationBuilder.AddColumn<DateTime>(
                name: "OwnerDateOfBirth",
                table: "Commitments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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
                name: "RoomWidth",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenantAddress",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenantCitizenIdentity",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TenantDateOfBirth",
                table: "Commitments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

            migrationBuilder.CreateTable(
                name: "CommitmentScaffoldings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommitmentScaffoldings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_CommitmentScaffoldingId",
                table: "Commitments",
                column: "CommitmentScaffoldingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_CommitmentScaffoldings_CommitmentScaffoldingId",
                table: "Commitments",
                column: "CommitmentScaffoldingId",
                principalTable: "CommitmentScaffoldings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
