export function generateSVG(params?: { color?: string; count?: string }) {
  const color = params?.color ?? "#FF0000";
  const count = params?.count ?? "4143311387171328";

  return `
<svg width="100%" height="100%" viewBox="0 0 324 168" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    <g transform="matrix(0.948819,0,0,0.809524,8.29134,16)">
        <path d="M324,24.345L324,143.655L303.229,168L20.771,168L0,143.655L0,24.345L20.771,0L303.229,0L324,24.345Z" style="fill:#${color};stroke:${color};stroke-width:1.87px;"/>
    </g>
    <g transform="matrix(1,0,0,1,-70,-24.7556)">
        <text x="107.392px" y="91.184px" style="font-family:'ProductSans-Black', 'Product Sans Black';font-weight:900;font-size:24px;fill:white;">This p<tspan x="174.4px 183.976px 197.512px 210.976px 224.68px 237.904px " y="91.184px 91.184px 91.184px 91.184px 91.184px 91.184px ">royect</tspan> c<tspan x="266.608px 280.384px 293.944px 303.904px " y="91.184px 91.184px 91.184px 91.184px ">onta</tspan>in<tspan x="337.768px " y="91.184px ">s</tspan>:</text>
        <g transform="matrix(24,0,0,24,275.632,127.184)">
        </g>
        <text x="70%" y="70%" text-anchor="middle" dominant-baseline="middle" style="font-family:'ProductSans-Black', 'Product Sans Black';font-weight:900;font-size:24px;fill:white;"> ${count} views</text>
    </g>
</svg>


`;
}
