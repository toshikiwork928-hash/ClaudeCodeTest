"""
温泉記録追加スクリプト
対話式で入力を受け取り、スプレッドシートの末尾に1行追加する
"""

import gspread
from google.oauth2.service_account import Credentials
from datetime import date
from config import SPREADSHEET_ID, SHEET_NAME, CREDENTIALS_PATH

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]


def prompt(label, required=True, default=None):
    """入力プロンプト。required=True かつ未入力なら再入力を促す。"""
    hint = f"（デフォルト: {default}）" if default else "（任意、Enterでスキップ）" if not required else ""
    while True:
        value = input(f"{label} {hint}: ").strip()
        if not value and default is not None:
            return default
        if not value and not required:
            return ""
        if not value and required:
            print("  ※ この項目は必須です。")
            continue
        return value


def prompt_rating():
    """評価（1〜5）の入力。任意。"""
    while True:
        value = input("評価 1〜5（任意、Enterでスキップ）: ").strip()
        if not value:
            return ""
        if value in {"1", "2", "3", "4", "5"}:
            return value
        print("  ※ 1〜5 の数字を入力してください。")


def prompt_date():
    """訪問日の入力。デフォルト今日。"""
    today = date.today().strftime("%Y/%m/%d")
    while True:
        value = input(f"訪問日（YYYY/MM/DD）（デフォルト: {today}）: ").strip()
        if not value:
            return today
        # 簡易フォーマットチェック
        parts = value.split("/")
        if len(parts) == 3 and all(p.isdigit() for p in parts) and len(parts[0]) == 4:
            return value
        print("  ※ YYYY/MM/DD 形式で入力してください（例: 2026/07/01）。")


def main():
    creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=SCOPES)
    client = gspread.authorize(creds)

    spreadsheet = client.open_by_key(SPREADSHEET_ID)
    sheet = spreadsheet.worksheet(SHEET_NAME)

    print("=" * 40)
    print("  温泉記録を追加します")
    print("=" * 40)

    name = prompt("施設名", required=True)
    location = prompt("都道府県・市区町村", required=True)
    visit_date = prompt_date()
    url = prompt("公式サイトURL", required=False)
    rating = prompt_rating()
    memo = prompt("メモ", required=False)

    # 現在の最終行番号を取得して次のNo.を決める
    all_rows = sheet.get_all_values()
    # ヘッダー行を除いたデータ行数
    data_rows = [r for r in all_rows if r and r[0].isdigit()]
    next_no = len(data_rows) + 1

    new_row = [str(next_no), name, location, visit_date, url, rating, memo]

    print()
    print("---- 確認 --------------------------------")
    labels = ["No.", "施設名", "場所", "訪問日", "URL", "評価", "メモ"]
    for label, val in zip(labels, new_row):
        if val:
            print(f"  {label}: {val}")
    print("------------------------------------------")

    answer = input("この内容でスプレッドシートに追加しますか？ (yes/no): ").strip().lower()
    if answer != "yes":
        print("キャンセルしました。")
        return

    sheet.append_row(new_row, value_input_option="USER_ENTERED")
    print(f"\n追加しました！（No.{next_no}: {name}）")
    print(f"スプレッドシート: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}")


if __name__ == "__main__":
    main()
