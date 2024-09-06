// ==UserScript==
// @name         Humble Key Restriction-EN
// @description  Display Humble Bundle region restriction infomation on Humble's download page
// @author       ThisXfinityX
// @namespace    https://github.com/ThisXfinityX/Humble-Key-Restriction-EN
// @supportURL   https://github.com/ThisXfinityX/Humble-Key-Restriction-EN/issues
// @version      1.0.0
// @icon         https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png
// @include      https://www.humblebundle.com/downloads*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

/* global GM_xmlhttpRequest */

(function () {
  'use strict';

  // From: https://github.com/clancy-chao/Steam-Bundle-Sites-Extension
  const localization = {
      AD: 'Andorra',
      AE: 'United Arab Emirates',
      AF: 'Afghanistan',
      AG: 'Antigua and Barbuda',
      AI: 'Anguilla',
      AL: 'Albania',
      AM: 'Armenia',
      AO: 'Angola',
      AQ: 'Antarctica',
      AR: 'Argentina',
      AS: 'American Samoa',
      AT: 'Austria',
      AU: 'Australia',
      AW: 'Aruba',
      AX: 'Aland Islands',
      AZ: 'Azerbaijan',
      BA: 'Bosnia and Herzegovina',
      BB: 'Barbados',
      BD: 'Bangladesh',
      BE: 'Belgium',
      BF: 'Burkina Faso',
      BG: 'Bulgaria',
      BH: 'Bahrain',
      BI: 'Burundi',
      BJ: 'Benin',
      BL: 'Saint Barthélemy',
      BM: 'Bermuda',
      BN: 'Brunei',
      BO: 'Bolivia',
      BQ: 'Bonaire',
      BR: 'Brazil',
      BS: 'Bahamas',
      BT: 'Bhutan',
      BV: 'Bouvet Island',
      BW: 'Botswana',
      BY: 'Belarus',
      BZ: 'Belize',
      CA: 'Canada',
      CC: 'Cocos (Keeling) Islands',
      CD: 'East Congo',
      CF: 'Central African Republic',
      CG: 'West Congo',
      CH: 'Switzerland',
      CI: 'Ivory Coast',
      CK: 'Cook Islands',
      CL: 'Chile',
      CM: 'Cameroon',
      CN: 'China',
      CO: 'Colombia',
      CR: 'Costa Rica',
      CS: 'Serbia and Montenegro',
      CU: 'Cuba',
      CV: 'Cabo Verde',
      CW: 'Curaçao',
      CX: 'Christmas Island',
      CY: 'Cyprus',
      CZ: 'Czechia',
      DE: 'Germany',
      DJ: 'Djibouti',
      DK: 'Denmark',
      DM: 'Dominica',
      DO: 'Dominican Republic',
      DZ: 'Algeria',
      EC: 'Ecuador',
      EE: 'Estonia',
      EG: 'Egypt',
      EH: 'Western Sahara',
      ER: 'Eritrea',
      ES: 'Spain',
      ET: 'Ethiopia',
      FI: 'Finland',
      FJ: 'Fiji',
      FK: 'Falkland Islands',
      FM: 'Micronesia',
      FO: 'Faroe Islands',
      FR: 'France',
      GA: 'Gabon',
      GB: 'United Kingdom',
      GD: 'Grenada',
      GE: 'Georgia',
      GF: 'French Guiana',
      GG: 'Guernsey',
      GH: 'Ghana',
      GI: 'Gibraltar',
      GL: 'Greenland',
      GM: 'Gambia',
      GN: 'Guinea',
      GP: 'Guadeloupe',
      GQ: 'Equatorial Guinea',
      GR: 'Greece',
      GS: 'South Georgia and the South Sandwich Islands',
      GT: 'Guatemala',
      GU: 'Guam',
      GW: 'Guinea-Bissau',
      GY: 'Guyana',
      HK: 'Hong Kong',
      HM: 'Heard Island and McDonald Islands',
      HN: 'Honduras',
      HR: 'Croatia',
      HT: 'Haiti',
      HU: 'Hungary',
      ID: 'Indonesia',
      IE: 'Ireland',
      IL: 'Israel',
      IM: 'Isle of Man',
      IN: 'India',
      IO: 'British Indian Ocean Territory',
      IQ: 'Iraq',
      IR: 'Iran',
      IS: 'Iceland',
      IT: 'Italy',
      JE: 'Jersey',
      JM: 'Jamaica',
      JO: 'Jordan',
      JP: 'Japan',
      KE: 'Kenya',
      KG: 'Kyrgyzstan',
      KH: 'Cambodia',
      KI: 'Kiribati',
      KM: 'Comoros',
      KN: 'Saint Kitts and Nevis',
      KP: 'North Korea',
      KR: 'South Korea',
      KW: 'Kuwait',
      KY: 'Cayman Islands',
      KZ: 'Kazakhstan',
      LA: 'Lao',
      LB: 'Lebanon',
      LC: 'Saint Lucia',
      LI: 'Liechtenstein',
      LK: 'Sri Lanka',
      LR: 'Liberia',
      LS: 'Lesotho',
      LT: 'Lithuania',
      LU: 'Luxembourg',
      LV: 'Latvia',
      LY: 'Libya',
      MA: 'Morocco',
      MC: 'Monaco',
      MD: 'Moldova',
      ME: 'Montenegro',
      MF: 'Saint Martin (French part)',
      MG: 'Madagascar',
      MH: 'Marshall Islands',
      MK: 'Macedonia',
      ML: 'Mali',
      MM: 'Myanmar',
      MN: 'Mongolia',
      MO: 'Macao',
      MP: 'Northern Mariana Islands',
      MQ: 'Martinique',
      MR: 'Mauritania',
      MS: 'Montserrat',
      MT: 'Malta',
      MU: 'Mauritius',
      MV: 'Maldives',
      MW: 'Malawi',
      MX: 'Mexico',
      MY: 'Malaysia',
      MZ: 'Mozambique',
      NA: 'Namibia',
      NC: 'New Caledonia',
      NE: 'Niger',
      NF: 'Norfolk Island',
      NG: 'Nigeria',
      NI: 'Nicaragua',
      NL: 'Netherlands',
      NO: 'Norway',
      NP: 'Nepal',
      NR: 'Nauru',
      NU: 'Niue',
      NZ: 'New Zealand',
      OM: 'Oman',
      PA: 'Panama',
      PE: 'Peru',
      PF: 'French Polynesia',
      PG: 'Papua New Guinea',
      PH: 'Philippines',
      PK: 'Pakistan',
      PL: 'Poland',
      PM: 'Saint Pierre and Miquelon',
      PN: 'Pitcairn',
      PR: 'Puerto Rico',
      PS: 'Palestine',
      PT: 'Portugal',
      PW: 'Palau',
      PY: 'Paraguay',
      QA: 'Qatar',
      RE: 'Reunion',
      RO: 'Romania',
      RS: 'Serbia',
      RU: 'Russia',
      RW: 'Rwanda',
      SA: 'Saudi Arabia',
      SB: 'Solomon Islands',
      SC: 'Seychelles',
      SD: 'Sudan',
      SE: 'Sweden',
      SG: 'Singapore',
      SH: 'Saint Helena, Ascension and Tristan da Cunha',
      SI: 'Slovenia',
      SJ: 'Svalbard and Jan Mayen',
      SK: 'Slovakia',
      SL: 'Sierra Leone',
      SM: 'San Marino',
      SN: 'Senegal',
      SO: 'Somalia',
      SR: 'Suriname',
      SS: 'South Sudan',
      ST: 'Sao Tome and Principe',
      SV: 'El Salvador',
      SX: 'Sint Maarten (Dutch part)',
      SY: 'Syria',
      SZ: 'Swaziland',
      TC: 'Turks and Caicos Islands',
      TD: 'Chad',
      TF: 'French Southern Territories',
      TG: 'Togo',
      TH: 'Thailand',
      TJ: 'Tajikistan',
      TK: 'Tokelau',
      TL: 'Timor-Leste',
      TM: 'Turkmenistan',
      TN: 'Tunisia',
      TO: 'Tonga',
      TR: 'Turkey',
      TT: 'Trinidad and Tobago',
      TV: 'Tuvalu',
      TW: 'Taiwan',
      TZ: 'Tanzania',
      UA: 'Ukraine',
      UG: 'Uganda',
      UM: 'United States Minor Outlying Islands',
      US: 'United States',
      UY: 'Uruguay',
      UZ: 'Uzbekistan',
      VA: 'Holy See',
      VC: 'Saint Vincent and the Grenadines',
      VE: 'Venezuela',
      VG: 'Virgin Islands, British',
      VI: 'Virgin Islands, U.S.',
      VN: 'Viet Nam',
      VU: 'Vanuatu',
      WF: 'Wallis and Futuna',
      WS: 'Samoa',
      XK: 'Kosovo',
      YE: 'Yemen',
      YT: 'Mayotte',
      ZA: 'South Africa',
      ZM: 'Zambia',
      ZW: 'Zimbabwe',
  };

  /*Format: 
  { 
    Game Title : {
    exclusive_countries: Array<string>,
    disallowed_countries: Array<string>,
    machine_name: string,
    team_app_id:? number
    },
    Game Title : {...},
    ...
  }
  */
  const productsInfo = [];

  const getProductsInfo = () => {
    const splitedURL = location.href.split(/downloads\?key=([A-Za-z0-9]+)/);
    if (splitedURL.length >= 2) {
      const orderID = splitedURL[1];
      const ApiURL = `https://www.humblebundle.com/api/v1/order/${orderID}?all_tpkds=true`;
      console.log('Humble Key Restriction User Script::', `Request API ${ApiURL}`);
      GM_xmlhttpRequest({
        method: 'GET',
        url: ApiURL,
        onload: (res) => {
          const { status, responseText } = res;
          if (status === 200) {
            if (responseText != '') {
              const products = JSON.parse(responseText).tpkd_dict.all_tpks;
              for (let product of products) {
                const humanName = product.human_name;
                productsInfo[humanName] = {};
                productsInfo[humanName].exclusive_countries = product.exclusive_countries;
                productsInfo[humanName].disallowed_countries = product.disallowed_countries;
                productsInfo[humanName].machine_name = product.machine_name;
                if (product.steam_app_id && product.steam_app_id !== '') {
                  productsInfo[humanName].steam_app_id = product.steam_app_id;
                }
              }
              setTimeout(() => {
                insertHTML();
              }, 1000);
            }
          } else {
            console.error('Humble Key Restriction User Script::', `Request order failed with ${status} HTTP status and ${responseText} content.`);
          }
        },
      });
    }
  };

  const insertHTML = () => {
    let nodes = document.getElementsByClassName('key-redeemer');
    if (nodes.length === 0) {
      setTimeout(() => {
        console.error('Humble Key Restriction User Script::', 'Insert HTML again!');
        insertHTML();
      }, 500);
      return;
    }
    console.log('Humble Key Restriction User Script::', 'Insert HTML!');
    for (let node of nodes) {
      let headingNode = node.getElementsByClassName('heading-text');
      if (headingNode.length === 1) {
        let headingText = headingNode.item(0).firstElementChild.innerText.trim();
        const productInfo = productsInfo[headingText];
        if (productInfo) {
          const insertElem = document.createElement('div');
          insertElem.className = 'humble-key-restriction';

          // Add Steam Store Link
          if (productInfo.steam_app_id) {
            const steamAppElem = document.createElement('a');
            steamAppElem.href = `https://store.steampowered.com/app/${productInfo.steam_app_id}`;
            steamAppElem.setAttribute('lang', 'zh-CN');
            steamAppElem.textContent = `Steam Store Link：https://store.steampowered.com/app/${productInfo.steam_app_id}`;
            steamAppElem.target = '_blank';
            steamAppElem.rel = 'noopener';
            insertElem.append(steamAppElem);
            insertElem.append(document.createElement('br'));
          }

          // Add Machine Name
          const machineNameElem = document.createElement('span');
          machineNameElem.innerText = `Machine Name: ${productInfo.machine_name}`;
          insertElem.append(machineNameElem);
          insertElem.append(document.createElement('br'));

          // Add restriction information
          if (productInfo.exclusive_countries.length === 0 && productInfo.disallowed_countries.length === 0) {
            const noRestrictionElem = document.createElement('span');
            noRestrictionElem.setAttribute('style', 'color: #97B147; font-weight: bold;');
            noRestrictionElem.setAttribute('lang', 'zh-CN');
            noRestrictionElem.innerText = 'Global!';
            insertElem.append(noRestrictionElem);
          } else {
            if (productInfo.exclusive_countries.length > 0) {
              const exclusiveCountryElem = document.createElement('span');
              exclusiveCountryElem.setAttribute('style', 'color:red; font-weight: bold; word-wrap:break-word; overflow:hidden;');
              exclusiveCountryElem.setAttribute('lang', 'zh-CN');
              exclusiveCountryElem.innerText = `ONLY CAN REDEEM IN：${translate(productInfo.exclusive_countries)}`;
              insertElem.append(exclusiveCountryElem);
              insertElem.append(document.createElement('br'));
            }
            if (productInfo.disallowed_countries.length > 0) {
              const disallowedCountryElem = document.createElement('span');
              disallowedCountryElem.setAttribute('style', 'color:red; font-weight: bold; word-wrap:break-word; overflow:hidden;');
              disallowedCountryElem.setAttribute('lang', 'zh-CN');
              disallowedCountryElem.innerText = `CAN'T REDEEM IN：${translate(productInfo.disallowed_countries)}`;
              insertElem.append(disallowedCountryElem);
            }
          }
          node.querySelector('.container').after(insertElem);
        }
      }
    }
  };

  const translate = arr => {
    return arr.map(attr => localization[attr]).reduce((a, b) => `${a}、${b}`);
  };

  getProductsInfo();

})();
