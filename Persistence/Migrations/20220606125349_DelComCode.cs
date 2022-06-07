using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class DelComCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Commitments_CommitmentCode",
                table: "Commitments");

            migrationBuilder.DropColumn(
                name: "CommitmentCode",
                table: "Commitments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CommitmentCode",
                table: "Commitments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Commitments_CommitmentCode",
                table: "Commitments",
                column: "CommitmentCode",
                unique: true);
        }
    }
}
