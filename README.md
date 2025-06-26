# 2025/06/26

## MapLibre GL JSによる地図表示機能の実装

- ベース地図のスタイルURLに `https://tiles.stadiamaps.com/styles/osm-bright/style.json` を指定していたが、404エラーが発生。
- 代わりにMapLibre公式の無料サンプルスタイル `https://demotiles.maplibre.org/style.json` を使うよう修正し、地図の正常表示を確認。

## OpenRailwayMapの路線図タイルの重ね合わせ

- ベースマップに路線図レイヤーを追加するために、OpenRailwayMapのラスタタイルをMapLibreのカスタムレイヤーとして追加。
- これにより、路線図情報を重ねて表示できるようになった。

## Overpass APIを用いた施設検索機能の実装

- 地図の現在表示範囲内で、選択したamenityタグ（例: cafe, restaurantなど）の施設情報をOverpass APIから取得。
- 取得した施設にマーカーを設置し、クリックでモーダル表示される仕組みを構築。

## UIの改善

- 施設カテゴリを選択できるセレクトボックスと検索ボタンを設置し、ユーザーが任意のカテゴリで施設検索を行えるようにした。

## GitHubへのSSH接続設定

- GitHubへのプッシュでSSH認証エラーが出たため、新規にSSH鍵ペアを作成。
- 公開鍵をGitHubアカウントに登録し、SSH接続テストを実施。
- これにより、GitHubリポジトリへの正常なプッシュが可能になった。


