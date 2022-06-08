using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeNameOfJoiningCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitementId",
                table: "JoiningCodes");

            migrationBuilder.RenameColumn(
                name: "CommitementId",
                table: "JoiningCodes",
                newName: "CommitmentId");

            migrationBuilder.RenameIndex(
                name: "IX_JoiningCodes_CommitementId",
                table: "JoiningCodes",
                newName: "IX_JoiningCodes_CommitmentId");

            migrationBuilder.AddColumn<bool>(
                name: "IsUnread",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitmentId",
                table: "JoiningCodes",
                column: "CommitmentId",
                principalTable: "Commitments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoiningCodes_Commitments_CommitmentId",
                table: "JoiningCodes");

            migrationBuilder.DropColumn(
                name: "IsUnread",
                table: "Notifications");

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
