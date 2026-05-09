using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZwcadVietnam.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddI18nColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentEn",
                table: "News",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentZh",
                table: "News",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExcerptEn",
                table: "News",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExcerptZh",
                table: "News",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "News",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleZh",
                table: "News",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnswerEn",
                table: "Faqs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnswerZh",
                table: "Faqs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionEn",
                table: "Faqs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionZh",
                table: "Faqs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "Downloads",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleZh",
                table: "Downloads",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CtaLabelEn",
                table: "Banners",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CtaLabelZh",
                table: "Banners",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubtitleEn",
                table: "Banners",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubtitleZh",
                table: "Banners",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "Banners",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleZh",
                table: "Banners",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentEn",
                table: "News");

            migrationBuilder.DropColumn(
                name: "ContentZh",
                table: "News");

            migrationBuilder.DropColumn(
                name: "ExcerptEn",
                table: "News");

            migrationBuilder.DropColumn(
                name: "ExcerptZh",
                table: "News");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "News");

            migrationBuilder.DropColumn(
                name: "TitleZh",
                table: "News");

            migrationBuilder.DropColumn(
                name: "AnswerEn",
                table: "Faqs");

            migrationBuilder.DropColumn(
                name: "AnswerZh",
                table: "Faqs");

            migrationBuilder.DropColumn(
                name: "QuestionEn",
                table: "Faqs");

            migrationBuilder.DropColumn(
                name: "QuestionZh",
                table: "Faqs");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "Downloads");

            migrationBuilder.DropColumn(
                name: "TitleZh",
                table: "Downloads");

            migrationBuilder.DropColumn(
                name: "CtaLabelEn",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "CtaLabelZh",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "SubtitleEn",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "SubtitleZh",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "TitleZh",
                table: "Banners");
        }
    }
}
