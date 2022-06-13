using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class FixConflictInSnapShot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitmentId",
                table: "JoiningCodes");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "CommitmentId",
                table: "JoiningCodes",
                newName: "CommitementId");

            migrationBuilder.RenameIndex(
                name: "IX_JoiningCodes_CommitmentId",
                table: "JoiningCodes",
                newName: "IX_JoiningCodes_CommitementId");

            migrationBuilder.AddForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitementId",
                table: "JoiningCodes",
                column: "CommitementId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
