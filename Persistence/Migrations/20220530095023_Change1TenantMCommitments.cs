using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class Change1TenantMCommitments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommitmentContains");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_ManagerId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_RoomId",
                table: "Commitments");

            migrationBuilder.AlterColumn<Guid>(
                name: "ManagerId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_ManagerId",
                table: "Commitments",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_OwnerId",
                table: "Commitments",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_RoomId",
                table: "Commitments",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_TenantId",
                table: "Commitments",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_Users_OwnerId",
                table: "Commitments",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Commitments_Users_TenantId",
                table: "Commitments",
                column: "TenantId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_Users_OwnerId",
                table: "Commitments");

            migrationBuilder.DropForeignKey(
                name: "FK_Commitments_Users_TenantId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_ManagerId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_OwnerId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_RoomId",
                table: "Commitments");

            migrationBuilder.DropIndex(
                name: "IX_Commitments_TenantId",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Commitments");

            migrationBuilder.AlterColumn<Guid>(
                name: "ManagerId",
                table: "Commitments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CommitmentContains",
                columns: table => new
                {
                    CommitmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommitmentContains", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommitmentContains_Commitments_CommitmentId",
                        column: x => x.CommitmentId,
                        principalTable: "Commitments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommitmentContains_Users_TenantId",
                        column: x => x.TenantId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_ManagerId",
                table: "Commitments",
                column: "ManagerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_RoomId",
                table: "Commitments",
                column: "RoomId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CommitmentContains_CommitmentId",
                table: "CommitmentContains",
                column: "CommitmentId");

            migrationBuilder.CreateIndex(
                name: "IX_CommitmentContains_TenantId",
                table: "CommitmentContains",
                column: "TenantId");
        }
    }
}
