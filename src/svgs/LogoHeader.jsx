import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const LogoHeader = (props) => (
  <Svg
    width={75}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M57.861 24.291v-2.823c0-.445-.146-.742-.659-.742-.44 0-.732.297-.879.52v3.045h-1.172v-2.823c0-.445-.22-.742-.659-.742-.366 0-.732.297-.879.52v3.045h-1.172v-4.457h1.172v.594c.22-.223.733-.668 1.465-.668.66 0 1.099.297 1.245.817.22-.372.806-.817 1.538-.817.806 0 1.319.445 1.319 1.337v3.268H57.86v-.074ZM62.402 24.291v-.445c-.293.37-.805.594-1.391.594-.733 0-1.538-.446-1.538-1.486s.805-1.411 1.538-1.411c.586 0 1.098.223 1.391.52v-.595c0-.445-.366-.742-.952-.742-.44 0-.879.222-1.245.52l-.44-.818c.513-.52 1.246-.668 1.905-.668 1.025 0 1.904.371 1.904 1.708v2.898h-1.172v-.075Zm0-1.04v-.52c-.22-.223-.586-.371-.952-.371-.44 0-.806.223-.806.668 0 .446.367.669.806.669.366-.074.733-.223.952-.446ZM64.453 23.177v-2.303h-.732v-1.04h.732v-1.263h1.172v1.189h.879v1.04h-.879v2.006c0 .297.147.52.366.52.147 0 .366-.075.366-.149l.22.891c-.146.149-.513.298-.952.298-.732.074-1.172-.372-1.172-1.189Z"
        fill="#727272"
      />
      <Path
        d="M66.504 22.063c0-1.337.952-2.377 2.344-2.377.879 0 1.465.371 1.758.817l-.733.742c-.22-.297-.513-.445-.952-.445-.733 0-1.172.52-1.172 1.263 0 .742.513 1.337 1.172 1.337.366 0 .732-.149.952-.52l.733.743c-.293.371-.806.817-1.758.817-1.319 0-2.344-.966-2.344-2.377ZM73.901 24.291v-2.748c0-.595-.293-.817-.805-.817-.44 0-.806.222-1.026.52v3.045h-1.172v-6.166h1.172v2.303c.293-.297.806-.668 1.538-.668.953 0 1.465.52 1.465 1.411v3.195h-1.172v-.075Z"
        fill="#727272"
      />
      <Path
        d="m0 23.623 2.197-3.863c.88.966 2.124 1.783 3.736 1.783 2.197 0 3.662-1.56 3.662-3.789V1.783h5.053v15.971c0 5.572-3.515 8.246-8.276 8.246C3.955 26 1.685 25.33 0 23.623ZM15.234 16.937c0-4.903 3.37-9.063 9.01-9.063 5.639 0 9.008 4.16 9.008 9.063 0 4.903-3.37 9.063-9.009 9.063-5.64 0-9.009-4.16-9.009-9.063Zm13.33 0c0-2.674-1.538-4.977-4.394-4.977-2.783 0-4.321 2.303-4.321 4.977 0 2.748 1.538 5.051 4.32 5.051 2.857 0 4.395-2.302 4.395-5.051ZM33.765 25.554V1.783h4.467v8.765c1.319-1.782 3.223-2.674 5.274-2.674 4.321 0 7.544 3.417 7.544 9.063 0 5.794-3.223 9.063-7.544 9.063-2.05 0-3.882-.892-5.274-2.674v2.228h-4.467Zm8.35-3.566c2.563 0 4.32-2.005 4.32-5.051 0-2.971-1.757-4.977-4.32-4.977-1.466 0-3.077.891-3.883 2.006v6.091c.806 1.114 2.417 1.931 3.882 1.931Z"
        fill="#091D5C"
      />
      <Path
        d="m52.661 12.629-1.611 1.634-1.611 1.634c-2.198 2.229-5.787 2.229-8.057 0l-.513-.52c-.659-.668-1.172-1.634-1.392-2.525 0 0 .733-.743 2.198-.818.146.372.732 1.263 1.025 1.56l.513.52a3.108 3.108 0 0 0 4.468 0l1.611-1.634 1.611-1.634c.953-.966 1.172-2.452.66-3.64 0-.074-.074-.149-.074-.149l-.073-.074c0-.074-.073-.074-.073-.149l-.147-.148c0-.074-.073-.074-.073-.149l-.22-.223-.512-.52-.22-.222c-.073 0-.073-.075-.147-.075-.073 0-.073-.074-.146-.074s-.073-.074-.147-.074l-.073-.075c-.073 0-.146-.074-.146-.074-1.172-.52-2.564-.371-3.59.669l-1.61 1.634-.513.52h-.44a6.125 6.125 0 0 0-3.589 1.189c-.073.074-.146.074-.146.148.293-.743.879-1.56 1.392-2.08l1.465-1.708 1.61-1.635A5.586 5.586 0 0 1 50.025 2.6h.074c.073 0 .146.074.22.074 0 0 .073 0 .073.075.073 0 .146.074.22.074 0 0 .073 0 .073.074.146.075.22.075.293.149.073.074.146.148.293.148l.073.075c.073.074.146.074.22.148l.073.075c.073.074.146.074.146.148l.074.074.22.223.512.52.22.223.073.074c.073.075.073.149.146.149l.074.074c.073.075.073.149.146.223l.073.074c.074.075.147.149.147.298.073.074.073.222.146.297 0 0 0 .074.074.074 0 .074.073.149.073.223 0 0 0 .074.073.074 0 .074.073.149.073.223v.074c.44 1.337.44 2.749-.073 4.086 0 .074-.073.074-.073.149 0 0 0 .074-.073.074-.074.074-.074.223-.147.297l-.073.074c-.073.075-.073.149-.147.223l-.073.075c-.073.074-.146.222-.22.297 0 0 0 .074-.073.074l-.22.223-.073.074c.22.297.147.372 0 .446ZM55.005 4.457c1.213 0 2.197-.998 2.197-2.228C57.202.998 56.218 0 55.005 0c-1.214 0-2.197.998-2.197 2.229 0 1.23.983 2.228 2.197 2.228Z"
        fill="#84FFFF"
      />
      <Path
        d="M55.005 16.863c1.213 0 2.197-.998 2.197-2.229 0-1.23-.984-2.228-2.197-2.228-1.214 0-2.197.997-2.197 2.228 0 1.231.983 2.229 2.197 2.229Z"
        fill="#091D5C"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h75v26H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default LogoHeader