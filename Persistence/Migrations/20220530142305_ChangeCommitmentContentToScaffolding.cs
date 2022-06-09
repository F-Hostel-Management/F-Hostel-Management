using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeCommitmentContentToScaffolding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Commitments");

            migrationBuilder.AddColumn<Guid>(
                name: "CommitmentScaffoldingId",
                table: "Commitments",
                type: "uniqueidentifier",
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
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "CommitmentScaffoldingId",
                table: "Commitments");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Commitments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
