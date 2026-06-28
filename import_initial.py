"""
初回インポートスクリプト
スプレッドシートにヘッダー行と初期データ21件を書き込む
"""

import gspread
from google.oauth2.service_account import Credentials
from config import SPREADSHEET_ID, SHEET_NAME, CREDENTIALS_PATH

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

INITIAL_DATA = [
    [1, "多摩境天然温泉 森乃彩", "東京都町田市", "2026/01/10", "https://morinoirodori.com/", "", ""],
    [2, "昭島温泉 湯楽の里", "東京都昭島市", "2026/01/23", "https://www.yurakirari.com/akishima/", "", ""],
    [3, "天然温泉 花鳥風月", "埼玉県日高市", "2026/02/28", "https://www.saiboku.co.jp/kachofugetsu/", "", ""],
    [4, "天然温泉 加賀の宝泉（御宿 野乃金沢）", "石川県金沢市", "2026/03/09", "https://dormy-hotels.com/dormyinn/hotels/nono_kanazawa/", "", ""],
    [5, "湯涌温泉 湯の出旅館", "石川県金沢市", "2026/03/10", "https://www.yunode.jp/", "", ""],
    [6, "モダン湯治 おんりーゆー", "神奈川県南足柄市", "2026/03/20", "https://www.ashigara-only-you.com/", "", ""],
    [7, "都幾の湯（四季彩館）", "埼玉県ときがわ町", "2026/04/05", "https://shikisaikan-tokigawa.com/", "", ""],
    [8, "南総城山温泉 里見の湯", "千葉県館山市", "2026/04/11", "https://www.satominoyu.com/", "", ""],
    [9, "オーシャンスパ Fuua", "静岡県熱海市", "2026/04/18", "https://www.atamibayresort.com/fuua/", "", ""],
    [10, "みやかみの湯", "神奈川県湯河原町", "2026/04/25", "https://miyakaminoyu.jp/", "", ""],
    [11, "AQUAIGNIS武蔵野温泉", "埼玉県吉川市", "2026/05/02", "https://aquaignis.jp/yoshikawaminami/spa.php", "", ""],
    [12, "昭和レトロな温泉銭湯 玉川温泉", "埼玉県ときがわ町", "2026/05/09", "https://tamagawa-onsen.com/", "", ""],
    [13, "白龍閣", "山梨県山梨市", "2026/05/16", "https://www.hakuryukaku.com/", "", ""],
    [14, "宮沢湖温泉 喜楽里別邸", "埼玉県飯能市", "2026/05/23", "https://www.yurakirari.com/miyazawako/", "", ""],
    [15, "オーシャンスパ Fuua（2回目）", "静岡県熱海市", "2026/05/30", "https://www.atamibayresort.com/fuua/", "", ""],
    [16, "深大寺天然温泉 湯守の里", "東京都調布市", "2026/05/31", "http://www.yumorinosato.com/", "", ""],
    [17, "国領温泉 助七", "兵庫県丹波市", "2026/06/05", "https://www.sukeshichi.jp/", "", ""],
    [18, "竹取温泉 灯りの湯", "京都府八幡市", "2026/06/06", "http://www.akarinoyu.com/", "", ""],
    [19, "稲城天然温泉 季乃彩", "東京都稲城市", "2026/06/14", "http://www.tokinoirodori.com/", "", ""],
    [20, "七沢荘", "神奈川県厚木市", "2026/06/21", "https://www.nanasawasou.jp/hotspring/day_trip.html", "", ""],
    [21, "七沢荘（2回目）", "神奈川県厚木市", "2026/06/28", "https://www.nanasawasou.jp/hotspring/day_trip.html", "", ""],
]

HEADERS = ["No.", "施設名", "都道府県・市区町村", "訪問日", "公式サイトURL", "評価（1〜5）", "メモ"]


def main():
    creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=SCOPES)
    client = gspread.authorize(creds)

    spreadsheet = client.open_by_key(SPREADSHEET_ID)
    sheet = spreadsheet.worksheet(SHEET_NAME)

    # 既存データを確認
    existing = sheet.get_all_values()
    if existing:
        answer = input(f"シートに既に {len(existing)} 行のデータがあります。上書きしますか？ (yes/no): ").strip().lower()
        if answer != "yes":
            print("キャンセルしました。")
            return
        sheet.clear()

    # ヘッダー + データを一括書き込み
    rows = [HEADERS] + [list(map(str, row)) for row in INITIAL_DATA]
    sheet.update(rows, "A1")

    # ヘッダー行を太字に
    sheet.format("A1:G1", {"textFormat": {"bold": True}})

    print(f"完了: ヘッダー1行 + データ{len(INITIAL_DATA)}行を書き込みました。")
    print(f"スプレッドシート: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}")


if __name__ == "__main__":
    main()
