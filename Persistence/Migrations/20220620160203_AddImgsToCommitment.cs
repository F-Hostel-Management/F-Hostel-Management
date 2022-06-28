using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddImgsToCommitment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Compensation",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "DateOverdue",
                table: "Commitments");

            migrationBuilder.CreateTable(
                name: "CommitmentImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImgUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CommitmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommitmentImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommitmentImages_Commitments_CommitmentId",
                        column: x => x.CommitmentId,
                        principalTable: "Commitments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommitmentImages_CommitmentId",
                table: "CommitmentImages",
                column: "CommitmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommitmentImages");

            migrationBuilder.AddColumn<double>(
                name: "Compensation",
                table: "Commitments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "DateOverdue",
                table: "Commitments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
