var map;//←大文字にする
var svp;//ストリートビューパノラマオブジェクト
var svs;//ストリートビューサービスオブジェクト
var CurrentLatLng;//現在の緯度経度を一時保存
var LatLngLst; //緯度経度リスト　定義は、myLatLngLst.js にて
//var HalfKpLst; //キロポスト中間点座標リスト
var Pegman;// = new L.marker();//ペグマン
var LyrAnimal = L.layerGroup([]);
var LyrR9Kp = L.layerGroup([]);
var LyrR27Kp = L.layerGroup([]);
var LyrFallingObj = L.layerGroup([]);
var LyrAccident = L.layerGroup([]);
var LyrNotification = L.layerGroup([]);


var PegmanIcon = L.icon({ //カメラアイコン、ここではペグマンとして定義
	iconUrl: "img/pegman.png",
	iconRetinaUrl: "img/pegman.png",//RetinaScreenはiPhoneディスプレイのこと
	iconSize: [20, 20],
	iconAnchor: [10, 10],
	popupAnchor: [0, 0],
	name: "Pegman"
});

var shikaIcon = L.icon({ //シカアイコン
	iconUrl: './img/shika.png',
	iconRetinaUrl: './img/shika.png',
	iconSize: [30, 30],
	iconAnchor: [15, 30],
	popupAnchor: [0, -30]
});
var inosisiIcon = L.icon({ //イノシシ
	iconUrl: './img/inosisi.png',
	iconRetinaUrl: './img/inosisi.png',
	iconSize: [30, 20],
	iconAnchor: [11, 17],
	popupAnchor: [0, -30]
});
var animalSIcon = L.icon({ //小動物アイコン
	iconUrl: './img/animalS.png',
	iconRetinaUrl: './img/animalS.png',
	iconSize: [20, 15],
	iconAnchor: [5, 15],
	popupAnchor: [0, -30]
});

accidentIcon = L.icon({ //事故アイコン
	iconUrl: './img/accident.png',
	iconRetinaUrl: './img/accident.png',
	iconSize: [30, 20],
	iconAnchor: [5, 15],
	popupAnchor: [0, -30]
});

notificationIcon = L.icon({ //通報アイコン
	iconUrl: './img/notification.png',
	iconRetinaUrl: './img/notification.png',
	iconSize: [20, 15],
	iconAnchor: [5, 15],
	popupAnchor: [0, -30]
});

fallingObjIcon = L.icon({ //落下物アイコン
	iconUrl: './img/fallingObj.png',
	iconRetinaUrl: './img/fallingObj.png',
	iconSize: [20, 15],
	iconAnchor: [5, 15],
	popupAnchor: [0, -30]
});

jQuery(function ($) {
	//////////////ノンBlobモード///////////////////////////////////////
	createLstTag(LatLngLst);

	//https通信とする
	var std = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
		attribution: " <a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>国土地理院 </a>",
		maxZoom: 20
	});
	var pale = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
		attribution: " <a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>国土地理院 </a>",
		maxZoom: 20
	});
	var osm = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
		attribution: '© <a href="http://osm.org/copyright">OpenStreetMap </a> contributors',
		maxZoom: 20
	});

	// ベースマップは、ソースに書いた順番に並び、最初に記載したタイルが初期表示
	var baseMaps = {
		"標準地図": std,
		"淡色地図": pale,
		"OSM(地図)": osm
	};

	var overlayMaps = {
		"R9KP": LyrR9Kp,
		"R27KP": LyrR27Kp,
		"動物死骸": LyrAnimal,
		"落下物": LyrFallingObj,
		"事故": LyrAccident,
		"通報": LyrNotification
	};
	//マップオブジェクトを作成し表示するレイヤーを指定
	map = L.map('mapCanvas', { layers: [std, LyrR9Kp, LyrR27Kp, LyrAnimal] }).setView([35.23222265555128, 135.21938323974607], 11);;

	// 最初のレイヤーグループは単一選択（ラジオボタン）、２つめは複数選択（チェックボックス）
	L.control.layers(baseMaps, overlayMaps).addTo(map); // レイヤーコントローラーの表示
	L.control.scale({ metric: true, imperial: false }).addTo(map);	//Kmスケールの表示

    /*　落木現場登録
	var marker01 = L.marker([35.3199472, 134.9848567], {
        	title: '落木現場',
        	draggable: true
    	}).addTo(map);
 	marker01.bindPopup("<b>現場写真</b><br>H30年3月11日<br><img src='photo/DSC_0672.JPG' width=200 height=112 alt=''><img src='photo/DSC_0676.JPG' width=200 height=112 alt=''>");
    */

	var svs = new google.maps.StreetViewService();
	svp = new google.maps.StreetViewPanorama(
		document.getElementById("mapView"),
		{//ストリートビューに表示する各種コントロールの指定
			addressControl: true,
			addressControlOptions: "BOTTOM_RIGHT",
			clickToGo: true, //移動
			disableDoubleClickZoom: true,
			imageDateControl: true,		//撮影日の表示
			enableCloseButton: false,	//閉じるボタンの表示
			linksControl: true,
			panControl: true,
			scrollwheel: true,
			visible: true,
			zoomControl: true,
			//fullscreenControl: true, //全画面ビューへのコントロールを表示
			//fullscreenControlOptions: { //↓表示されない
			//	position: google.maps.ControlPosition.TOP_CENTER ,
			//} ,
			position: map.getCenter()
		});
	// デフォルトで起動する右クリックイベント(コンテキストメニューを表示)イベントをキャンセル
	map.addEventListener("contextmenu", function (e) {
		//e.preventDefault();//←はJQueryの場合のみか？mapには当該メソッドはない？？　このイベントをセットしなくても、何も書かなくてもキャンセルされる見たい。
		//↓デフォルトイベントキャンセル
	}, false);

	map.on('mousedown', function (e) {  //地図をクリックしたときのイベント
		switch (e.originalEvent.button) {
			case 0: //左ボタンクリック
				break;
			case 1: //中ボタンクリックでシカマーカーをセット
				L.marker([e.latlng.lat, e.latlng.lng], {
					title: "lat:" + e.latlng.lat + " lng:" + e.latlng.lng,
					icon: shikaIcon,
					draggable: true //ドラッグ可  動的に可動可にする場合はmap.dragPan.enable();
				}).bindPopup("マーカーをクリックしました。").addTo(map);

				break;

			case 2: //右ボタンクリックでペグマン(カメラ)セット 
				if (Pegman != null) map.removeLayer(Pegman);//既存のペグマン(カメラ)がいれば、それを削除
				//ペグマン追加
				Pegman = L.marker(
					{ lat: svp.getLocation().latLng.lat(), lng: svp.getLocation().latLng.lng() },
					{ icon: PegmanIcon, zIndexOffset: 999 }
				).addEventListener("click", pegmanClickEvnt, false).addTo(map);//選択したリストに対応するペグマンをセット

				svp.setPosition(e.latlng);//ストリートビューの移動
				break;
		}
	});

	svp.setPov({ heading: 0, pitch: 0, zoom: 0 });
	//ストリートビューパノラマ画像のイベントセット
	svp.addListener('pov_changed', function () {//向きが変わった
		if (Pegman != null) { // 既存のペグマンがいれば、向きを変更　（厳密に評価する場合は !== undefined） 
			Pegman.setRotationAngle(svp.pov.heading);
		}
	});

	svp.addListener('position_changed', function () {//パノラマ画像の基本（LatLng）位置が変更された
		if (Pegman != null) {//既存のペグマンがいれば、移動　　　（厳密に評価する場合は !== undefined）
			Pegman.setLatLng({ lat: svp.getLocation().latLng.lat(), lng: svp.getLocation().latLng.lng() });
		}
		$("#currentLatTag")[0].innerText = svp.getLocation().latLng.lat();//現在位置を表示
		$("#currentLngTag")[0].innerText = svp.getLocation().latLng.lng();
	});

	//サーバーにある全てのイベントファイルのデータ送信要求
	socket.emit('C2S:sendRequestEventFilesData');


});

function pegmanClickEvnt() {
	alert("ペグマンがクリックされました。");
}

//地図とストリートビューの移動の
function map_pan(latlngLstId) {
	//ストリートビューパノラマ画面の更新
	if (LatLngLst[latlngLstId].panoId != null) {//緯度経度リストに、panoIdが含まれていれば、それを使う （厳密に評価する場合は !== undefined）
		svp.setPano(LatLngLst[latlngLstId].panoId);
	} else {									 //  　〃 　　　　　　いなければ、緯度経度からパノラマ画像を取得
		svp.setPosition(LatLngLst[latlngLstId].latlng);
	}

	svp.setPov({ heading: LatLngLst[latlngLstId].heading, pitch: LatLngLst[latlngLstId].pitch, zoom: LatLngLst[latlngLstId].zoom });
	map.panTo(LatLngLst[latlngLstId].latlng);//地図の移動
}


function processSVData(data, status) {
	if (status === 'OK') {//// ストリートビュー画像あり→マーカーを立て、ストリートビューを表示する

		svp.setPano(data.location.pano);
		// ストリートビューの表示が完了した後、カメラの向きを調整する必要あり
		//cf:http://scientre.hateblo.jp/entry/20150331/streetview_image
		//svp.setPov({  heading: 270,  pitch: 0});
		svp.setVisible(true);
	} else {//クリックした位置には、ストリートビュー画像がなかった
		console.log('Street View data not found for this location.');
	}
}

/*
function sendRequest_HalfKpLstFromBlobWithSocket() {
    console.log('   サーバーへ【データSendRequest】Emitする。');
    //alert('   サーバーへ【データSendRequest】Emitする。');
    //socket.emit('C2S:sendRequest_HalfKpLst');
}
*/

//デバッグ用：jsonかどうかを判定する。
function isJSON(arg) {
	arg = (typeof arg === "function") ? arg() : arg;
	if (typeof arg !== "string") {
		return false;
	}
	try {
		arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
		return true;
	} catch (e) {
		return false;
	}
}