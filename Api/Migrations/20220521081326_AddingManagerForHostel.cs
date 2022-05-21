using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class AddingManagerForHostel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostelWithCategory_Hostel_HostelId",
                table: "HostelWithCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelWithCategory_HostelCategory_CategoryId",
                table: "HostelWithCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelWithCategory",
                table: "HostelWithCategory");

            migrationBuilder.RenameTable(
                name: "HostelWithCategory",
                newName: "HostelClassification");

            migrationBuilder.RenameIndex(
                name: "IX_HostelWithCategory_HostelId",
                table: "HostelClassification",
                newName: "IX_HostelClassification_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelWithCategory_CategoryId",
                table: "HostelClassification",
                newName: "IX_HostelClassification_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelClassification",
                table: "HostelClassification",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "HostelManagent",
                columns: table => new
                {
                    HostelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostelManagent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HostelManagent_Hostel_HostelId",
                        column: x => x.HostelId,
                        principalTable: "Hostel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HostelManagent_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HostelManagent_HostelId",
                table: "HostelManagent",
                column: "HostelId");

            migrationBuilder.CreateIndex(
                name: "IX_HostelManagent_ManagerId",
                table: "HostelManagent",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelClassification_Hostel_HostelId",
                table: "HostelClassification",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HostelClassification_HostelCategory_CategoryId",
                table: "HostelClassification",
                column: "CategoryId",
                principalTable: "HostelCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostelClassification_Hostel_HostelId",
                table: "HostelClassification");

            migrationBuilder.DropForeignKey(
                name: "FK_HostelClassification_HostelCategory_CategoryId",
                table: "HostelClassification");

            migrationBuilder.DropTable(
                name: "HostelManagent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HostelClassification",
                table: "HostelClassification");

            migrationBuilder.RenameTable(
                name: "HostelClassification",
                newName: "HostelWithCategory");

            migrationBuilder.RenameIndex(
                name: "IX_HostelClassification_HostelId",
                table: "HostelWithCategory",
                newName: "IX_HostelWithCategory_HostelId");

            migrationBuilder.RenameIndex(
                name: "IX_HostelClassification_CategoryId",
                table: "HostelWithCategory",
                newName: "IX_HostelWithCategory_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HostelWithCategory",
                table: "HostelWithCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HostelWithCategory_Hostel_HostelId",
                table: "HostelWithCategory",
                column: "HostelId",
                principalTable: "Hostel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HostelWithCategory_HostelCategory_CategoryId",
                table: "HostelWithCategory",
                column: "CategoryId",
                principalTable: "HostelCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
