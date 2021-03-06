﻿//Html イベント要素作成
function createEventElement(elmntLst) {
	var htmlElmnt = "";

	for (var id in elmntLst) {//json配列中のキー(ショートUID）を繰り返し取得
		htmlElmnt = htmlElmnt + '<a><li class="evntList" id="' + htmlElmnt[id].id + '" onClick="alert("別ウィンドウで事象を表示")">' + htmlElmnt[id].title + '</li></a>';
	}
	//一旦、子要素を削除してリストを空にする。
	$("#ulListEvnt-1").empty();
	//子要素をセット
	$("#ulListEvnt-1").append(htmlElmnt);
}

//Html リストタグ生成
function createLstTag(lst) {
	//要注意！！　引数の「lst」が緯度経度リストであるか否かを調べる必要がある。
	var sortedArr = getSortedArr(lst);//LatLngLst中のキロポストで並び替えした配列を取得
	var mapIconNm;
	//var mapHalfKpIconNm = "img/markerHalf.png";

	var html9_1 = ""; var html9_2 = ""; var html9_3 = ""; var html9_4 = "";
	var html27_1 = ""; var html27_2 = ""; var html27_3 = "";
	var kiroPost;
	for (var id in sortedArr) {//json配列中のキー(ショートUID）を繰り返し取得
		kiroPost = sortedArr[id].kp;
		if (sortedArr[id].route == 9)
			if (kiroPost < 60.22)
				html9_1 = html9_1 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';
			else if (kiroPost < 71.405)
				html9_2 = html9_2 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';
			else if (kiroPost < 98.106)
				html9_3 = html9_3 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';
			else
				html9_4 = html9_4 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';
		if (sortedArr[id].route == 27)
			if (kiroPost < 96.79)
				html27_1 = html27_1 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';
			else if (kiroPost < 117.44)
				html27_2 = html27_2 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';
			else
				html27_3 = html27_3 + '<a><li class="mapPoint" id="' + sortedArr[id].id + '" onClick="listClick(this)">' + kiroPost + "KP: " + LatLngLst[sortedArr[id].id].title + '</li></a>';

		//キロポストから適切なマーカーアイコン名を設定
		if (Number.isInteger(kiroPost)) mapIconNm = "img/marker" + sortedArr[id].kp + ".png"
		else { alert("緯度経度リスト中に整数以外の数値がありました。"); }

		var mapIcon = L.icon({
			iconUrl: mapIconNm,
			iconRetinaUrl: mapIconNm,
			iconSize: [20, 20],
			iconAnchor: [10, 20],
			popupAnchor: [0, 0]
		});
		/*
		var marker = new L.marker(
			LatLngLst[sortedArr[id].id].latlng,	{
				title: sortedArr[id].id,//当該マーカーにセットするLatLngLst配列のIDをタイトルにセット
				icon: mapIcon
			}	//       ).addTo(map).on('click', function (e) {
		);
		*/
		if (sortedArr[id].route == 9) {
			LyrR9Kp.addLayer(new L.marker(
				LatLngLst[sortedArr[id].id].latlng,
				{
					title: sortedArr[id].id,//当該マーカーにセットするLatLngLst配列のIDをタイトルにセット
					icon: mapIcon,
					zIndexOffset: 0  //マイナスにすると、チップセット型マーカのZIndexより下になる。←そうとは言えない
				}).on('click', function (e) {
					map.panTo(e.latlng);
					svp.setPosition(e.latlng);
					//クリックしたマーカーのタイトルは、LatLngLst配列のIDとなっているのが前提
					//マーカーのタイトルから、LatLngLst配列の要素を取得し、ストリートビューのプロパティに設定する。
					svp.setPov({ heading: LatLngLst[this.options.title].heading, pitch: LatLngLst[this.options.title].pitch, zoom: LatLngLst[this.options.title].zoom });
				}));
		}
		if (sortedArr[id].route == 27) {
			LyrR27Kp.addLayer(new L.marker(
				LatLngLst[sortedArr[id].id].latlng, {
					title: sortedArr[id].id, icon: mapIcon, zIndexOffset: 0
				}).on('click', function (e) {
					map.panTo(e.latlng);
					svp.setPosition(e.latlng);
					svp.setPov({ heading: LatLngLst[this.options.title].heading, pitch: LatLngLst[this.options.title].pitch, zoom: LatLngLst[this.options.title].zoom });
				}));
		}
		/*
				addTo(map).on('click', function (e) {
					//alert("Lat:" + LatLngLst[this.options.title].latlng.lat + " Lng:" + LatLngLst[this.options.title].latlng.lng);
					map.panTo(e.latlng);
					svp.setPosition(e.latlng);
					//クリックしたマーカーのタイトルは、LatLngLst配列のIDとなっているのが前提
					//マーカーのタイトルから、LatLngLst配列の要素を取得し、ストリートビューのプロパティに設定する。
					svp.setPov({ heading: LatLngLst[this.options.title].heading, pitch: LatLngLst[this.options.title].pitch, zoom: LatLngLst[this.options.title].zoom });
				});
		*/
	}

	//一旦、子要素を削除してリストを空にする。
	$("#ulList9-1").empty();
	$("#ulList9-2").empty();
	$("#ulList9-3").empty();
	$("#ulList9-4").empty();
	$("#ulList27-1").empty();
	$("#ulList27-2").empty();
	$("#ulList27-3").empty();
	//子要素をセット
	$("#ulList9-1").append(html9_1);
	$("#ulList9-2").append(html9_2);
	$("#ulList9-3").append(html9_3);
	$("#ulList9-4").append(html9_4);
	$("#ulList27-1").append(html27_1);
	$("#ulList27-2").append(html27_2);
	$("#ulList27-3").append(html27_3);
}

//緯度経度リストを、キロポスト順に並び変える。
function getSortedArr(lst) {//LatLngLstはobj型
	var tmpArr = [];
	//一時配列を作る
	for (var sUid in lst) {
		tmpArr[tmpArr.length] = { id: sUid, kp: lst[sUid].kp, route: lst[sUid].route };
	}
	//一時配列をソート
	tmpArr.sort(function (a, b) { //（肝!!)配列名.sortメソッドは、メソッドの引数で指定した判定基準で並び変える。
		//↓エラー回避のため、数値か否か判定し、文字列なら半角数値とピリオド以外を削除したのち数値にしてから判定
		//var valA = Number(a.kp.replace(/[^0-9^\.]/g,""));//半角数値と"."(ピリオド)以外を削除
		//var valB = Number(b.kp.replace(/[^0-9^\.]/g,""));

		var valA = Number(a.kp);//そのまま数値に変換を行う（文字列なら"NaN"になる。)
		var valB = Number(b.kp);

		//判定
		if (valA > valB) return 1;
		if (valA < valB) return -1;

		return 0;
	});
	return tmpArr;
}

//ショートUID作成
function getShortUid(lst) {
	let tmpSuid;

	do {	//新たなショートUIDを取得
		//仮のショートUIDを作成
		tmpSuid = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
		//凝ったコード↓
		//while文中の無名関数でリストの中に同じ値のsUidが存在していないかチェックしている。
	} while ((function () {//関数内がfalseになるまでdoループ
		for (let itm in lst) {//jsonリスト中の全てのキーをループ
			if (itm == tmpSuid)
				return true;
		}
		return false;
	})());//←括弧のオンパレード！"()"は、当関数が即時実行関数であることから必須

	return tmpSuid;
}