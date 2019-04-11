var Marker = null;
//var AllEventData = [];//グローバル変数としてinitSocketIo.jsで宣言	

var UpLoadWin;//２重起動防止のためグローバル変数化
$(function () {
	//統計データ読み込みイベント
	$('#inputFile').on("change", function () {
		var file = this.files[0];
		//if (file != null) {
		//	alert(file.name); // ファイル名をログに出力する
		//}
		var reader = new FileReader();
		// ファイル読み取りに失敗したとき
		reader.onerror = function () {
			alert('ファイル読み取りに失敗しました');
		};
		// ファイル読み取りに成功したとき
		reader.onload = function () {
			var jsonArr = JSON.parse(reader.result);
			//paneを利用したイベントマーカーのZIndex設定
			//https://qiita.com/kkdd/items/a406cbde0d343d2061aa
			//http://nobmob.blogspot.com/2018/06/leaflet-13-4-10-working-with-map-panes.html

			var groupByKpArr = {
				"9": {},
				"27": {}
			};

			//キロポスト毎に集計
			for (let item in jsonArr) {
				let route = jsonArr[item]["号線"];
				let kp = jsonArr[item]["KP"];
				let evnt = jsonArr[item]["事象"];
				let target = jsonArr[item]["対象"];

				//↓テクニック！　cf: http://nakawake.net/?p=831 //配列アイテムをセットしてからでないと count++できない(プロパティーが見つかりませんエラー)
				if (kp in groupByKpArr[route]) {//この連想配列にkpがあれば
					if (evnt in groupByKpArr[route][kp]) {//この連想配列にevntがあれば
						if (target in groupByKpArr[route][kp][evnt]) {//この連想配列にtargetがあれば
							groupByKpArr[route][kp][evnt][target].count++
						} else {//targetがなければ
							groupByKpArr[route][kp][evnt][target] = { count: 0 }
						}
					} else {//evntがなければ
						groupByKpArr[route][kp][evnt] = { [target]: { count: 0 } }
					}
				} else {	//kpがなければ
					groupByKpArr[route][kp] = { [evnt]: { [target]: { count: 0 } } }
				}
			}

			//集計後のカウンター値に基づき、マーカーアイコンの数をセット
			map.createPane("paneEvntMrkrZIndex990").style.zIndex = 990;//Ｚインデック設定用Pane
			for (let route in groupByKpArr) {
				for (let kp in groupByKpArr[route]) {
					for (let evnt in groupByKpArr[route][kp]) {
						for (let target in groupByKpArr[route][kp][evnt]) {
							let mrkIcons = [];
							for (let i = 0; i < groupByKpArr[route][kp][evnt][target].count + 1; i++) {//マーカーアイコン追加
								if (target == "シカ") mrkIcons.push(shikaIcon);
								if (target == "イノシシ") mrkIcons.push(inosisiIcon);
								if (target == "小動物") mrkIcons.push(animalSIcon);
								if (target == "落下物") mrkIcons.push(fallingObjIcon);
								if (target == "事故") mrkIcons.push(accidentIcon);
								if (target == "通報") mrkIcons.push(notificationIcon);
							}
							if (R9Kp100mPich[kp]) {
								console.log(kp);
							} else { console.log("X" + kp);}
							if (route == "9") {
								if (evnt == "死骸処理") {
									LyrAnimal.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R9Kp100mPich[kp]["lat"],
											R9Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('死骸処理')
									);
								}
								if (evnt == "落下物") {
									LyrFallingObj.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R9Kp100mPich[kp]["lat"],
											R9Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('落下物')
									);
								}
								if (evnt == "事故") {
									LyrAccident.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R9Kp100mPich[kp]["lat"],
											R9Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('落下物')
									);
								}
								if (evnt == "通報") {
									LyrNotification.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R9Kp100mPich[kp]["lat"],
											R9Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('落下物')
									);
								}
							}
							if (route == "27") {
								if (evnt == "死骸処理") {
									LyrAnimal.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R27Kp100mPich[kp]["lat"],
											R27Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('死骸処理')
									);
								}
								if (evnt == "落下物") {
									LyrFallingObj.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R27Kp100mPich[kp]["lat"],
											R27Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('落下物')
									);
								}
								if (evnt == "事故") {
									LyrAccident.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R27Kp100mPich[kp]["lat"],
											R27Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('事故')
									);
								}
								if (evnt == "通報") {
									LyrNotification.addLayer(//チップセット型アイコンセット
										L.marker.stack(new L.LatLng(R27Kp100mPich[kp]["lat"],
											R27Kp100mPich[kp]["lng"]), {
												pane: "paneEvntMrkrZIndex990", //  Zインデックスセット
												icons: mrkIcons,
												stackOffset: [0, -13]　//重なりオフセット
											}).bindPopup('通報')
									);
								}
							}
						}
					}
				}
			}
		};
		reader.readAsText(file);
	});
});


//現地写真表示ボタンクリック時のイベント
function openJpgImg() {
	//alert('写真表示');
	//document.getElementById("mapView").style.display = "none";
	//var queryStr = '?' + $('#currentLatTag')[0].innerText + '&' + $('#currentLngTag')[0].innerText;
	//var UpLoadWin = window.open('/jpgImg' + queryStr, 'showJpg', 'width=535, height=580, status=no, resizable=yes, alwaysraised=true, scrollbars=yes, toolbar=no, menubar=no');
	//	$(UpLoadWin).on('load', function () {
	//		alert('開いたよ');
	//	});
}

//特記事象リストクリック時に発火
function eventListClick(elm) {//elmは、クリックされた特記事象のタグエレメントのこと
	if (UpLoadWin != null) {//アップロード用の画面定義が一度でもされており、且つ
		if (!UpLoadWin.closed) {//アップロード用が閉じていなければ
			alert("アップロード用の画面を閉じて再実行して下さい。");
			return false;
		}
	}


	//アップロード用の子フォームを表示、ここで子フォームの幅や高さ、ツールバーの表示などを指定していることに注意
	UpLoadWin = window.open('/imgUploadForm', 'imgUploadForm', 'width=570, height=580, status=no, resizable=yes, scrollbars=yes, toolbar=no, menubar=no');
	$(UpLoadWin).on('load', function () {
		//以下、別ファンクションにまとめる。
		for (let itm of AllEventData) { //「AllEventData」はグローバル変数
			//全てのイベントデータから、今回クリックされた要素のIDと同じものであれば、アップロードフォームに転記する。
			if (itm.eventId == elm.id) {
				//既存のマーカーを消してからマーカーを立てる。
				if (Marker) {
					map.removeLayer(Marker);
				}

				Marker = L.marker([itm.HeadrLat, itm.HeadrLng], {
					title: "マーカー",
					draggable: true
				}).addTo(map);
				Marker.bindPopup("<b>特記事象登録ポイント</b><br>マーカー<br>");

				if (itm.HeadrCategory == "落下物") {
					$(UpLoadWin.document).find('#id_HdrCtgryRakkabutu')[0].checked = true;
					$(UpLoadWin.document).find('#id_HdrCtgryRakkabutu')[0].onchange();//チェックボックスが変化したときのイベントの強制呼出し。
				}
				if (itm.HeadrCategory == "事故") {
					$(UpLoadWin.document).find('#id_HdrCtgryJiko')[0].checked = true;
					$(UpLoadWin.document).find('#id_HdrCtgryJiko')[0].onchange();//チェックボックスが変化したときのイベントの強制呼出し。
				}
				if (itm.HeadrCategory == "災害") {
					$(UpLoadWin.document).find('#id_HdrCtgrySaigai')[0].checked = true;
					$(UpLoadWin.document).find('#id_HdrCtgrySaigai')[0].onchange();//チェックボックスが変化したときのイベントの強制呼出し。
				}
				if (itm.HeadrCategory == "苦情") {
					$(UpLoadWin.document).find('#id_HdrCtgryKujou')[0].checked = true;
					$(UpLoadWin.document).find('#id_HdrCtgryKujou')[0].onchange();//チェックボックスが変化したときのイベントの強制呼出し。
				}
				if (itm.HeadrCategory == "通報") {
					$(UpLoadWin.document).find('#id_HdrCtgryTuuhou')[0].checked = true;
					$(UpLoadWin.document).find('#id_HdrCtgryTuuhou')[0].onchange();//チェックボックスが変化したときのイベントの強制呼出し。
				}
				if (itm.HeadrCategory == "その他") {
					$(UpLoadWin.document).find('#id_HdrCtgrySonota')[0].checked = true;
					$(UpLoadWin.document).find('#id_HdrCtgrySonota')[0].onchange();//チェックボックスが変化したときのイベントの強制呼出し。
				}

				$(UpLoadWin.document).find('#eventId')[0].value = itm.eventId;
				$(UpLoadWin.document).find('#id_submitButton')[0].value = "上書き保存【実行】";//編集モードに設定
				$(UpLoadWin.document).find('#id_HeadrTarget')[0].value = itm.HeadrTarget;
				$(UpLoadWin.document).find('#id_HeadrAttender')[0].value = itm.HeadrAttender;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;

				$(UpLoadWin.document).find('#id_HeadrYear')[0].value = itm.HeadrYear;
				$(UpLoadWin.document).find('#id_HeadrMonth')[0].value = itm.HeadrMonth;
				$(UpLoadWin.document).find('#id_HeadrDay')[0].value = itm.HeadrDay;
				$(UpLoadWin.document).find('#id_HeadrHour')[0].value = itm.HeadrHour;
				$(UpLoadWin.document).find('#id_HeadrMinute')[0].value = itm.HeadrMinute;

				$(UpLoadWin.document).find('#id_HeadrRoute')[0].value = itm.HeadrRoute;
				$(UpLoadWin.document).find('#id_HeadrCity')[0].value = itm.HeadrCity;
				$(UpLoadWin.document).find('#id_HeadrAddres')[0].value = itm.HeadrAddres;
				$(UpLoadWin.document).find('#id_HeadrKp')[0].value = itm.HeadrKp;
				$(UpLoadWin.document).find('#id_HeadrChisaki')[0].value = itm.HeadrChisaki;
				$(UpLoadWin.document).find('#id_HeadrLane')[0].value = itm.HeadrLane;

				$(UpLoadWin.document).find('#id_HeadrGaiyou')[0].value = itm.HeadrGaiyou;

				$(UpLoadWin.document).find('#id_HeadrLat')[0].value = itm.HeadrLat;
				$(UpLoadWin.document).find('#id_HeadrLng')[0].value = itm.HeadrLng;


				if (!Array.isArray(itm.HstryYear)) {//配列型でなければ、（※複数の履歴がある場合は、配列型になる）
					$(UpLoadWin.document).find('#id_Itm1Year')[0].value = itm.HstryYear;
					$(UpLoadWin.document).find('#id_Itm1Month')[0].value = itm.HstryMonth;
					$(UpLoadWin.document).find('#id_Itm1Day')[0].value = itm.HstryDay;
					$(UpLoadWin.document).find('#id_Itm1Hour')[0].value = itm.HstryHour;
					$(UpLoadWin.document).find('#id_Itm1Minute')[0].value = itm.HstryMinute;
					$(UpLoadWin.document).find('#id_Itm1Contents')[0].value = itm.HstryContents;
				} else {//配列型であれば（複数の履歴があれば
					let elmStr;	//検索する要素名
					//配列の個数回繰り返し
					for (let i = 1; i < itm.HstryYear.length + 1; i++) {
						elmStr = '#id_Itm' + i + 'Year';
						$(UpLoadWin.document).find(elmStr)[0].value = itm.HstryYear[i-1];
						elmStr = '#id_Itm' + i + 'Month';
						$(UpLoadWin.document).find(elmStr)[0].value = itm.HstryMonth[i-1];
						elmStr = '#id_Itm' + i + 'Day';
						$(UpLoadWin.document).find(elmStr)[0].value = itm.HstryDay[i-1];
						elmStr = '#id_Itm' + i + 'Hour';
						$(UpLoadWin.document).find(elmStr)[0].value = itm.HstryHour[i-1];
						elmStr = '#id_Itm' + i + 'Minute';
						$(UpLoadWin.document).find(elmStr)[0].value = itm.HstryMinute[i-1];
						elmStr = '#id_Itm' + i + 'Contents';
						$(UpLoadWin.document).find(elmStr)[0].value = itm.HstryContents[i-1];
						if (i < itm.HstryYear.length)//未だ配列の個数に達していなければ（次の配列があれば)
							$(UpLoadWin.document).find('#id_AddHstrBtn')[0].onclick();//履歴欄を追加するイベント駆動
					}
				}


				//画像が添付されていれば、ソケットでサーバーへ要求する。
				//画像添付欄は、９個まで作成済みである。
				if (itm.imgFiles) {//【imgFiles】要素があれば（画像があれば)
					if (!Array.isArray(itm.imgFiles.imgFileNames)) {//一個しかなければ(配列型でなければ)、（※複数の履歴がある場合は、配列型になる）
						//登録画像表示ボタンの『name』属性に画像ファイル名をセットする。
						$(UpLoadWin.document).find('#id_dispImgBtn1').attr("name", itm.imgFiles.imgFileNames);
					} else {
						for (let i = 1; i < itm.imgFiles.imgFileNames.length + 1; i++) {
							$(UpLoadWin.document).find('#id_dispImgBtn' + i.toString(10)).attr('name',itm.imgFiles.imgFileNames[i-1]);
							//ファイル読み込みボタンは非表示にする。
							$(UpLoadWin.document).find('#id_tdUploadFileBtn' + i.toString(10)).css('display', 'none');
							if (i < itm.imgFiles.imgFileNames.length)//未だ配列の個数に達していなければ（次の配列があれば)
								$(UpLoadWin.document).find('#id_AddImgBtn')[0].onclick();//画像欄を追加するイベント駆動
						}
					}
				}
				//else {//配列型であれば（複数の履歴があれば
				//	let elmStr;	//検索する要素名
				//	//配列の個数回繰り返し
				//	for (let i = 1; i < itm.HstryYear.length + 1; i++) {
			}				
/*
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
				$(UpLoadWin.document).find('#id_HeadrInformer')[0].value = itm.HeadrInformer;
*/

		}
	});
}
			
			//事象登録フォームボタンクリック時のイベント
function openImgUploadForm() {
	var queryStr = '?' + $('#currentLatTag')[0].innerText + '&' + $('#currentLngTag')[0].innerText;
	//アップロード用の子フォームを表示、ここで子フォームの幅や高さ、ツールバーの表示などを指定していることに注意
	UpLoadWin = window.open('/imgUploadForm' + queryStr, 'imgUploadForm', 'width=570, height=580, status=no, resizable=yes, scrollbars=yes, toolbar=no, menubar=no');

	/*
	var marker01 = L.marker([svp.getLocation().latLng.lat(), svp.getLocation().latLng.lng()], {
		title: "マーカー",
		draggable: true
	}).addTo(map);
	marker01.bindPopup("<b>事象登録ポイント</b><br>一時マーカー<br>");
	*/

/*	
	//子フォームが閉じたときに発火
	$(UpLoadWin).on('unload', function () {//子フォームが閉じた時点でも、UpLoadWin.$("#id_HeadLat")…が使えるので使っているが、、、
		setTimeout(function () {
			if (!UpLoadWin.closed) return;

			alert("子フォームが閉じられました");
			//オープン時にも呼び出されるので(？)、UpLoadWin.$("#id_HeadLat")[0].valueがヌルであれば何もせずリターンする
			//var marker01 = L.marker([UpLoadWin.$("#id_HeadrLat")[0].value, UpLoadWin.$("#id_HeadrLng")[0].value], {
			var marker01 = L.marker([svp.getLocation().latLng.lat(), svp.getLocation().latLng.lng()], {
				title: UpLoadWin.$("#id_HeadrTarget")[0].value, //'落木現場',
				draggable: true
			}).addTo(map);
			marker01.bindPopup("<b>現場写真</b><br>H30年3月11日<br><img src='photo/DSC_0672.JPG' width=200 height=112 alt=''><img src='photo/DSC_0676.JPG' width=200 height=112 alt=''>");
		}, 100);
	});
*/	
}

//緯度経度リストがクリックされた時に発火
function listClick(elm) {
	//訪問済みリンクの色が変わるのをここで防止できないか？
	if (currentPoint != "") {//直前にクリックしていたリストポイントがあれば、スタイルを元に戻す。
		currentPoint.style.backgroundColor = '#aaaaaa';
		currentPoint.style.fontWeight = 'normal';
		currentPoint.style.color = 'mediumblue';
	}
	elm.style.backgroundColor = '#ccccca';
	elm.style.fontWeight = 'bold';
	elm.style.color = 'orangered';
	currentPoint = elm;

	if (Pegman != null) map.removeLayer(Pegman);//既存のペグマンがいれば、それを削除
	Pegman = L.marker(LatLngLst[elm.id].latlng, { icon: PegmanIcon, rotationAngle: LatLngLst[elm.id].heading, zIndexOffset: 999 }).bindPopup("マーカーをクリックしました。").addTo(map);//選択したリストに対応するペグマンをセット
	map_pan(elm.id);//ファンクションに渡されたデータオブジェクトは、【e.data.sUid】で参照できる。
}

//タグのテキストをクリップボードに保存する()
function tagTextToClipboard(elmId) {
	var sorceTag = document.getElementById(elmId);

	//iPhoneのsafari対応　https://qiita.com/pscreator/items/2978ba41a94d2a6fe873　より
	var slct = window.getSelection();
	var range = document.createRange();
	range.selectNode(sorceTag);
	slct.removeAllRanges();    // ←既に選択済みの場合は解除、　追加 https://qiita.com/bass_ikeda/items/a26992f0882fafb06456

	slct.addRange(range);

	document.execCommand("copy");
	//    sorceTag.style.display = "none";
}

//事象マーカーを消す
function delMarkers() {
	//EventMarkers.forEach(function (value) {	map.removeLayer(value);});
	EventMarkers.forEach((value) => { map.removeLayer(value); });
}

//テストスクリプト実行
function testScript() {
	let htmlObj = "";
	$("*").each(function (i, elem) {
		htmlObj += i + ': ' + $(elem)[0].outerText + "\n";
		console.log(i + ': ' + $(elem)[0].outerHTML);
		if (i == 66) {
			alert($(elem)[0]);
		}
	});
	alert(htmlObj);
}