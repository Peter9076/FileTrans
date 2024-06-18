Vue.component('pdf-viewer', {
    props: ['pdfUrl'],
    template: `
        <div v-if="pages.length">
            <div class="pdf-page" v-for="page in pages" :key="page">
                <canvas :ref="'canvas' + page"></canvas>
            </div>
        </div>
    `,
    data() {
        return {
            pages: [],
            scale: 1.0
        };
    },
    async mounted() {
        await this.loadPDF();
    },
    watch: {
        scale() {
            this.loadPDF();
        }
    },
    methods: {
        zoomIn() {
            this.scale += 0.2;
        },
        zoomOut() {
            if (this.scale > 0.2) {
                this.scale -= 0.2;
            }
        },
        async loadPDF() {
            const pdfjsLib = window['pdfjs-dist/build/pdf'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

            try {
                const pdf = await pdfjsLib.getDocument(this.pdfUrl).promise;
                this.pages = Array.from({ length: pdf.numPages }, (v, k) => k + 1);

                this.$nextTick(async () => {
                    for (let num = 1; num <= pdf.numPages; num++) {
                        const page = await pdf.getPage(num);
                        const viewport = page.getViewport({ scale: this.scale });

                        const canvas = this.$refs['canvas' + num][0];
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        await page.render(renderContext).promise;
                    }
                });
            } catch (error) {
                console.error('Error loading PDF:', error);
            }
        }
    }
});

Vue.component('uploader-form', {
    template: `
    <el-form  class="uploader-form" style="height:180px;margin-left:50px;margin-bottom:20px"  label-position="right">
    <!-- Radio Group -->
    <el-form-item>
      <el-radio-group>
        <el-radio-button label="false" style="border" value="111">用于译后阅读</el-radio-button>
        <el-radio-button label="true" disabled  value="111">用于译后编辑</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <!-- Select -->
    <el-form-item label="保存到">
      <el-select  value="1" placeholder="请选择">
        <el-option label="我的文件-默认文件夹" value="1"></el-option>
        <!-- Add more options here -->
      </el-select>
    </el-form-item>

    <!-- Disabled Select -->
    <el-form-item label="默认视图">
      <el-select value="2" disabled placeholder="请选择">
        <el-option label="整页预览" value="2"></el-option>
        <!-- Add more options here -->
      </el-select>
    </el-form-item>

    <!-- Disabled Checkbox -->
    <el-form-item label="特色模式">
      <el-checkbox label="pdf论文增强模式" disabled value="1"></el-checkbox>
    </el-form-item>

    <!-- More form items... -->

  </el-form>`
})


Vue.component('uploader-icons', {
    template: `
    <div class="uploader-icons">
                                                                <span class="uploader-icon">
                                                                    <span class="uploader-icon-image">
                                                                        <svg width="33" height="30" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.01" fill="#D8D8D8"
                                                                                stroke="#979797" stroke-width="0.264"
                                                                                d="M.859 3.132h31.554v31.447H.859z">
                                                                            </path>
                                                                            <g opacity="0.8">
                                                                                <g opacity="0.01"
                                                                                    filter="url(#icon-docx_svg__filter0_f_2837_13453)">
                                                                                    <rect x="10.266" y="8.133"
                                                                                        width="20.417" height="22.462"
                                                                                        rx="1.321" fill="#0545CE">
                                                                                    </rect>
                                                                                </g>
                                                                                <g
                                                                                    filter="url(#icon-docx_svg__filter1_b_2837_13453)">
                                                                                    <path
                                                                                        d="M8.408 8.281c0-.73.591-1.321 1.321-1.321h17.774c.73 0 1.321.592 1.321 1.321v4.294H8.408V8.281z"
                                                                                        fill="url(#icon-docx_svg__paint0_linear_2837_13453)">
                                                                                    </path>
                                                                                </g>
                                                                                <path
                                                                                    fill="url(#icon-docx_svg__paint1_linear_2837_13453)"
                                                                                    d="M8.408 12.443h20.417v5.615H8.408z">
                                                                                </path>
                                                                                <path
                                                                                    transform="matrix(1 0 0 -1 8.408 23.674)"
                                                                                    fill="url(#icon-docx_svg__paint2_linear_2837_13453)"
                                                                                    d="M0 0h20.417v5.615H0z"></path>
                                                                                <path
                                                                                    d="M8.408 27.969c0 .73.591 1.321 1.321 1.321h17.774c.73 0 1.321-.591 1.321-1.321v-4.294H8.408v4.294z"
                                                                                    fill="url(#icon-docx_svg__paint3_linear_2837_13453)">
                                                                                </path>
                                                                            </g>
                                                                            <g
                                                                                clip-path="url(#icon-docx_svg__clip0_2837_13453)">
                                                                                <g
                                                                                    filter="url(#icon-docx_svg__filter2_bd_2837_13453)">
                                                                                    <rect x="2.444" y="11.832"
                                                                                        width="13.258" height="13.213"
                                                                                        rx="2.643" fill="#5686D6"
                                                                                        fill-opacity="0.2"></rect>
                                                                                    <rect x="2.708" y="12.096"
                                                                                        width="12.729" height="12.684"
                                                                                        rx="2.378"
                                                                                        stroke="url(#icon-docx_svg__paint4_linear_2837_13453)"
                                                                                        stroke-width="0.529"></rect>
                                                                                </g>
                                                                                <g
                                                                                    filter="url(#icon-docx_svg__filter3_d_2837_13453)">
                                                                                    <path
                                                                                        d="M4.664 15.225h1.083l1.225 4.898h.035l1.286-4.898h1.004l1.286 4.898h.035l1.225-4.898h1.083l-1.814 6.29H10.09L8.813 16.66h-.036L7.5 21.515H6.47l-1.806-6.29z"
                                                                                        fill="#fff"></path>
                                                                                </g>
                                                                            </g>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-docx_svg__paint0_linear_2837_13453"
                                                                                    x1="6.774" y1="6.061" x2="6.774"
                                                                                    y2="12.575"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#ADD5FF"></stop>
                                                                                    <stop offset="0.607"
                                                                                        stop-color="#73AAFC"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#629CFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-docx_svg__paint1_linear_2837_13453"
                                                                                    x1="8.408" y1="12.443" x2="8.408"
                                                                                    y2="18.059"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop offset="0.001"
                                                                                        stop-color="#2D5CD0"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#2C58E7"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-docx_svg__paint2_linear_2837_13453"
                                                                                    x1="0" y1="0" x2="0" y2="5.615"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#0755CD"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#1849BD"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-docx_svg__paint3_linear_2837_13453"
                                                                                    x1="5.832" y1="30.717" x2="5.831"
                                                                                    y2="23.677"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#6D94ED"></stop>
                                                                                    <stop offset="0.504"
                                                                                        stop-color="#1746AF"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#0F45A0"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-docx_svg__paint4_linear_2837_13453"
                                                                                    x1="2.512" y1="11.832" x2="2.512"
                                                                                    y2="24.908"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#C0E0FF"
                                                                                        stop-opacity="0.2"></stop>
                                                                                    <stop offset="1" stop-color="#fff"
                                                                                        stop-opacity="0.44"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-docx_svg__filter0_f_2837_13453"
                                                                                    x="3.083" y="0.95" width="34.783"
                                                                                    height="36.828"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="BackgroundImageFix"
                                                                                        result="shape"></feBlend>
                                                                                    <feGaussianBlur stdDeviation="3.592"
                                                                                        result="effect1_foregroundBlur_2837_13453">
                                                                                    </feGaussianBlur>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-docx_svg__filter1_b_2837_13453"
                                                                                    x="1.224" y="-0.223" width="34.783"
                                                                                    height="19.982"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="3.592">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2837_13453">
                                                                                    </feComposite>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_backgroundBlur_2837_13453"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-docx_svg__filter2_bd_2837_13453"
                                                                                    x="-0.429" y="8.959" width="19.004"
                                                                                    height="18.959"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="1.437">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2837_13453">
                                                                                    </feComposite>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="0.5" dy="0.5">
                                                                                    </feOffset>
                                                                                    <feGaussianBlur stdDeviation="1">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0 0 0 0 0 0.281575 0 0 0 0 0.944293 0 0 0 0.195941 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend
                                                                                        in2="effect1_backgroundBlur_2837_13453"
                                                                                        result="effect2_dropShadow_2837_13453">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect2_dropShadow_2837_13453"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-docx_svg__filter3_d_2837_13453"
                                                                                    x="4.164" y="14.725" width="10.263"
                                                                                    height="8.29"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="0.5" dy="0.5">
                                                                                    </feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.0588235 0 0 0 0 0.27451 0 0 0 0 0.631373 0 0 0 0.5 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_2837_13453">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_2837_13453"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <clipPath
                                                                                    id="icon-docx_svg__clip0_2837_13453">
                                                                                    <path fill="#fff"
                                                                                        transform="translate(2.446 11.833)"
                                                                                        d="M0 0h13.546v13.5H0z"></path>
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    </span>
                                                                    <i
                                                                        style="margin-top: 0;padding-bottom: 5px;">doc/docx</i>
                                                                </span>
                                                                <span class="uploader-icon">
                                                                    <span class="uploader-icon-images"><svg width="33"
                                                                            height="32" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <g
                                                                                clip-path="url(#icon-pdf_svg__clip0_2837_13208)">
                                                                                <path opacity="0.01" fill="#D8D8D8"
                                                                                    stroke="#979797"
                                                                                    stroke-width="0.264"
                                                                                    d="M.535.132h31.267v31.447H.535z">
                                                                                </path>
                                                                                <g opacity="0.8">
                                                                                    <path fill-rule="evenodd"
                                                                                        clip-rule="evenodd"
                                                                                        d="M8.152 6.243c0-.73.591-1.321 1.321-1.321H22.26l6.224 6.368v14.178c0 .73-.592 1.321-1.322 1.321H9.473c-.73 0-1.321-.591-1.321-1.321V6.243z"
                                                                                        fill="#EB5143"></path>
                                                                                    <mask id="icon-pdf_svg__a"
                                                                                        maskUnits="userSpaceOnUse" x="8"
                                                                                        y="4" width="21" height="23"
                                                                                        style="mask-type: luminance;">
                                                                                        <path fill-rule="evenodd"
                                                                                            clip-rule="evenodd"
                                                                                            d="M8.152 6.243c0-.73.591-1.321 1.321-1.321H22.26l6.224 6.368v14.178c0 .73-.592 1.321-1.322 1.321H9.473c-.73 0-1.321-.591-1.321-1.321V6.243z"
                                                                                            fill="#fff"></path>
                                                                                    </mask>
                                                                                    <g mask="url(#icon-pdf_svg__a)"
                                                                                        fill-rule="evenodd"
                                                                                        clip-rule="evenodd">
                                                                                        <path
                                                                                            d="M8.15 21.266h20.33v5.47H8.15v-5.47z"
                                                                                            fill="url(#icon-pdf_svg__paint0_linear_2837_13208)">
                                                                                        </path>
                                                                                        <path
                                                                                            d="M8.15 15.795h20.33v5.47H8.15v-5.47z"
                                                                                            fill="url(#icon-pdf_svg__paint1_linear_2837_13208)">
                                                                                        </path>
                                                                                        <path
                                                                                            d="M8.15 10.331h20.33v5.47H8.15v-5.47z"
                                                                                            fill="url(#icon-pdf_svg__paint2_linear_2837_13208)">
                                                                                        </path>
                                                                                        <path
                                                                                            d="M8.15 4.861H28.48v5.47H8.15v-5.47z"
                                                                                            fill="url(#icon-pdf_svg__paint3_linear_2837_13208)">
                                                                                        </path>
                                                                                    </g>
                                                                                </g>
                                                                                <g
                                                                                    filter="url(#icon-pdf_svg__filter0_b_2837_13208)">
                                                                                    <path fill-rule="evenodd"
                                                                                        clip-rule="evenodd"
                                                                                        d="M23.145 19.455a4.72 4.72 0 01-2.746-1.12c-1.522.336-2.97.821-4.417 1.419-1.15 2.053-2.227 3.098-3.155 3.098-.185 0-.408-.038-.556-.15a1.1 1.1 0 01-.631-1.007c0-.336.074-1.27 3.6-2.8.816-1.493 1.447-3.024 1.967-4.629-.445-.895-1.41-3.098-.742-4.217.222-.411.668-.635 1.15-.598.371 0 .743.187.965.486.483.672.446 2.09-.186 4.18a11.262 11.262 0 002.302 2.986c.78-.149 1.558-.261 2.338-.261 1.744.037 2.004.859 1.967 1.344 0 1.269-1.225 1.269-1.856 1.269zm-10.393 2.314l.112-.038c.52-.186.928-.56 1.225-1.045a2.939 2.939 0 00-1.337 1.083zm4.826-11.198h.111a3.156 3.156 0 01-.037 1.941c-.26-.597-.371-1.269-.223-1.903.037-.038.112-.038.149-.038zm.37 5.412l-.037.075-.037-.037a30.814 30.814 0 01-1.113 2.538l.074-.037v.074c.817-.299 1.707-.56 2.524-.746l-.037-.038h.111a11.42 11.42 0 01-1.484-1.829zm4.083 2.054c.335-.075.632-.075.966-.075.742 0 .89.186.89.298-.223.075-.482.112-.742.075-.371-.038-.742-.112-1.114-.298z"
                                                                                        fill="#fff"></path>
                                                                                </g>
                                                                                <path fill-rule="evenodd"
                                                                                    clip-rule="evenodd"
                                                                                    d="M22.278 4.922l6.208 6.368H23.6c-.73 0-1.322-.592-1.322-1.321V4.922z"
                                                                                    fill="#FFB2B2"></path>
                                                                                <g opacity="0.408"
                                                                                    filter="url(#icon-pdf_svg__filter1_f_2837_13208)">
                                                                                    <rect x="7.971" y="9.679"
                                                                                        width="8.145" height="13.477"
                                                                                        rx="0.793" fill="#C61A0B">
                                                                                    </rect>
                                                                                </g>
                                                                                <g
                                                                                    filter="url(#icon-pdf_svg__filter2_bd_2837_13208)">
                                                                                    <rect x="1.534" y="9.546"
                                                                                        width="13.138" height="13.213"
                                                                                        rx="2.114"
                                                                                        fill="url(#icon-pdf_svg__paint4_linear_2837_13208)">
                                                                                    </rect>
                                                                                    <rect x="1.798" y="9.81"
                                                                                        width="12.609" height="12.684"
                                                                                        rx="1.85"
                                                                                        stroke="url(#icon-pdf_svg__paint5_linear_2837_13208)"
                                                                                        stroke-width="0.529"></rect>
                                                                                </g>
                                                                                <g
                                                                                    filter="url(#icon-pdf_svg__filter3_d_2837_13208)">
                                                                                    <path
                                                                                        d="M6.408 12.94h4.272v.818H7.368v1.833h3.127v.819H7.368v2.819h-.96v-6.29z"
                                                                                        fill="#fff"></path>
                                                                                </g>
                                                                            </g>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-pdf_svg__paint0_linear_2837_13208"
                                                                                    x1="4.188" y1="21.266" x2="4.188"
                                                                                    y2="28.867"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop offset="0.001"
                                                                                        stop-color="#D91B0A"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#E5381A"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-pdf_svg__paint1_linear_2837_13208"
                                                                                    x1="-41.796" y1="15.795"
                                                                                    x2="-41.796" y2="48.142"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#E42919"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#F24E33"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#F45236"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-pdf_svg__paint2_linear_2837_13208"
                                                                                    x1="-22.376" y1="10.331"
                                                                                    x2="-22.376" y2="32.227"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#E53D2E"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#F4715A"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-pdf_svg__paint3_linear_2837_13208"
                                                                                    x1="-24.598" y1="4.861" x2="-24.598"
                                                                                    y2="27.953"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#EB5143"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#F78978"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-pdf_svg__paint4_linear_2837_13208"
                                                                                    x1="-4.735" y1="16.704" x2="9.582"
                                                                                    y2="31.294"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"
                                                                                        stop-opacity="0.2"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#FA6942"
                                                                                        stop-opacity="0.64"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-pdf_svg__paint5_linear_2837_13208"
                                                                                    x1="-4.615" y1="16.137" x2="8.562"
                                                                                    y2="28.43"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"
                                                                                        stop-opacity="0.5"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#FF6F49"
                                                                                        stop-opacity="0.5"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-pdf_svg__filter0_b_2837_13208"
                                                                                    x="10.938" y="8.746" width="14.768"
                                                                                    height="14.807"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="0.351">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2837_13208">
                                                                                    </feComposite>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_backgroundBlur_2837_13208"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-pdf_svg__filter1_f_2837_13208"
                                                                                    x="5.098" y="6.805" width="13.892"
                                                                                    height="19.224"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="BackgroundImageFix"
                                                                                        result="shape"></feBlend>
                                                                                    <feGaussianBlur stdDeviation="1.437"
                                                                                        result="effect1_foregroundBlur_2837_13208">
                                                                                    </feGaussianBlur>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-pdf_svg__filter2_bd_2837_13208"
                                                                                    x="-0.621" y="7.391" width="17.448"
                                                                                    height="17.523"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="1.077">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2837_13208">
                                                                                    </feComposite>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="1" dy="0.5">
                                                                                    </feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.164035 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend
                                                                                        in2="effect1_backgroundBlur_2837_13208"
                                                                                        result="effect2_dropShadow_2837_13208">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect2_dropShadow_2837_13208"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-pdf_svg__filter3_d_2837_13208"
                                                                                    x="5.408" y="12.439" width="6.272"
                                                                                    height="8.29"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dy="0.5"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.917431 0 0 0 0 0.159571 0 0 0 0 0.159571 0 0 0 0.462877 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_2837_13208">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_2837_13208"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <clipPath
                                                                                    id="icon-pdf_svg__clip0_2837_13208">
                                                                                    <path fill="#fff"
                                                                                        transform="translate(.403)"
                                                                                        d="M0 0h31.818v32H0z"></path>
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg></span><i>pdf</i></span><span
                                                                    class="uploader-icon"><span
                                                                        class="uploader-icon-images"><svg width="33"
                                                                            height="33" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.01" fill="#D8D8D8"
                                                                                stroke="#979797" stroke-width="0.267"
                                                                                d="M.71.633h31.552v31.733H.71z"></path>
                                                                            <g opacity="0.8">
                                                                                <path
                                                                                    d="M8.564 6.167c0-.736.597-1.333 1.333-1.333h8.875v5.533H8.564v-4.2z"
                                                                                    fill="url(#icon-excel_svg__paint0_linear_2870_5365)">
                                                                                </path>
                                                                                <path
                                                                                    d="M18.773 4.834h8.875c.736 0 1.333.597 1.333 1.333v4.2H18.772V4.834z"
                                                                                    fill="url(#icon-excel_svg__paint1_linear_2870_5365)">
                                                                                </path>
                                                                                <path
                                                                                    fill="url(#icon-excel_svg__paint2_linear_2870_5365)"
                                                                                    d="M18.773 10.167h10.208V15.7H18.773z">
                                                                                </path>
                                                                                <path
                                                                                    fill="url(#icon-excel_svg__paint3_linear_2870_5365)"
                                                                                    d="M8.564 10.167h10.208V15.7H8.564z">
                                                                                </path>
                                                                                <path fill="#185B37"
                                                                                    d="M8.564 15.701h10.208v5.533H8.564z">
                                                                                </path>
                                                                                <path
                                                                                    fill="url(#icon-excel_svg__paint4_linear_2870_5365)"
                                                                                    d="M18.773 15.701h10.208v5.533H18.773z">
                                                                                </path>
                                                                                <path
                                                                                    d="M18.773 21.234H28.98v4.2c0 .736-.597 1.333-1.334 1.333h-8.874v-5.533z"
                                                                                    fill="url(#icon-excel_svg__paint5_linear_2870_5365)">
                                                                                </path>
                                                                                <path
                                                                                    d="M18.773 21.234H8.564v4.2c0 .736.597 1.333 1.333 1.333h8.876v-5.533z"
                                                                                    fill="url(#icon-excel_svg__paint6_linear_2870_5365)">
                                                                                </path>
                                                                            </g>
                                                                            <g
                                                                                clip-path="url(#icon-excel_svg__clip0_2870_5365)">
                                                                                <g
                                                                                    filter="url(#icon-excel_svg__filter0_bd_2870_5365)">
                                                                                    <rect x="2.301" y="9.416"
                                                                                        width="13.258" height="13.333"
                                                                                        rx="2.667" fill="#1FC96F"
                                                                                        fill-opacity="0.2"></rect>
                                                                                    <rect x="2.567" y="9.683"
                                                                                        width="12.724" height="12.8"
                                                                                        rx="2.4"
                                                                                        stroke="url(#icon-excel_svg__paint7_linear_2870_5365)"
                                                                                        stroke-width="0.533"></rect>
                                                                                </g>
                                                                                <g
                                                                                    filter="url(#icon-excel_svg__filter1_d_2870_5365)">
                                                                                    <path
                                                                                        d="M6.331 12.885h1.242l1.624 2.408 1.624-2.408h1.241l-2.259 3.22 2.418 3.444h-1.242l-1.782-2.641-1.783 2.641H6.173l2.398-3.444-2.24-3.22z"
                                                                                        fill="#fff"></path>
                                                                                </g>
                                                                            </g>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint0_linear_2870_5365"
                                                                                    x1="8.564" y1="4.834" x2="8.564"
                                                                                    y2="10.367"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#45D09F"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#21A366"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint1_linear_2870_5365"
                                                                                    x1="13.913" y1="-0.434" x2="13.913"
                                                                                    y2="10.367"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#62E4B7"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#33C481"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint2_linear_2870_5365"
                                                                                    x1="7.984" y1="10.167" x2="7.984"
                                                                                    y2="27.395"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#21A366"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#45D09F"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint3_linear_2870_5365"
                                                                                    x1="-0.602" y1="10.167" x2="-0.602"
                                                                                    y2="25.637"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#0F7C41"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#22B376"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint4_linear_2870_5365"
                                                                                    x1="4.346" y1="15.701" x2="4.346"
                                                                                    y2="36.874"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#0F7C41"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#22B376"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint5_linear_2870_5365"
                                                                                    x1="17.832" y1="21.234" x2="17.832"
                                                                                    y2="27.786"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#185C37"></stop>
                                                                                    <stop offset="0.668"
                                                                                        stop-color="#1F6A43"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#359568"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint6_linear_2870_5365"
                                                                                    x1="19.713" y1="21.234" x2="19.713"
                                                                                    y2="27.786"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#185C37"></stop>
                                                                                    <stop offset="0.668"
                                                                                        stop-color="#1F6A43"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#359568"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-excel_svg__paint7_linear_2870_5365"
                                                                                    x1="20.707" y1="16.343" x2="9.227"
                                                                                    y2="4.374"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#17AA4D"
                                                                                        stop-opacity="0.2"></stop>
                                                                                    <stop offset="0.999"
                                                                                        stop-color="#fff"
                                                                                        stop-opacity="0.44"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-excel_svg__filter0_bd_2870_5365"
                                                                                    x="-0.599" y="6.517" width="19.057"
                                                                                    height="19.133"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="1.45">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2870_5365">
                                                                                    </feComposite>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="1" dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.0486838 0 0 0 0 0.548856 0 0 0 0 0.276704 0 0 0 0.495165 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend
                                                                                        in2="effect1_backgroundBlur_2870_5365"
                                                                                        result="effect2_dropShadow_2870_5365">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect2_dropShadow_2870_5365"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-excel_svg__filter1_d_2870_5365"
                                                                                    x="6.173" y="12.885" width="8.048"
                                                                                    height="8.664"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="1" dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.101961 0 0 0 0 0.466667 0 0 0 0 0.27451 0 0 0 0.495575 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_2870_5365">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_2870_5365"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <clipPath
                                                                                    id="icon-excel_svg__clip0_2870_5365">
                                                                                    <path fill="#fff"
                                                                                        transform="translate(2.3 9.416)"
                                                                                        d="M0 0h13.423v13.5H0z"></path>
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg></span><i>xls/xlsx</i></span><span
                                                                    class="uploader-icon"><span
                                                                        class="uploader-icon-images"><svg width="32"
                                                                            height="32" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.01" fill="#D8D8D8"
                                                                                stroke="#979797" stroke-width="0.529"
                                                                                d="M.264.264h31.471V31.71H.264z"></path>
                                                                            <g opacity="0.8">
                                                                                <ellipse cx="16.25" cy="15.737"
                                                                                    rx="11.25" ry="11.241"
                                                                                    fill="url(#icon-ppt_svg__paint0_linear_2879_20873)">
                                                                                </ellipse>
                                                                                <path
                                                                                    d="M16.25 4.496C10.037 4.496 5 9.53 5 15.737h11.25V4.497z"
                                                                                    fill="url(#icon-ppt_svg__paint1_linear_2879_20873)">
                                                                                </path>
                                                                                <path
                                                                                    d="M16.25 4.496c6.214 0 11.25 5.033 11.25 11.241H16.25V4.497z"
                                                                                    fill="url(#icon-ppt_svg__paint2_linear_2879_20873)">
                                                                                </path>
                                                                            </g>
                                                                            <g opacity="0.408"
                                                                                filter="url(#icon-ppt_svg__filter0_f_2879_20873)">
                                                                                <rect x="7.611" y="9.671" width="8.192"
                                                                                    height="13.466" rx="1.586"
                                                                                    fill="#C61A0B"></rect>
                                                                            </g>
                                                                            <g
                                                                                filter="url(#icon-ppt_svg__filter1_bd_2879_20873)">
                                                                                <rect x="1.137" y="9.539" width="13.213"
                                                                                    height="13.202" rx="2"
                                                                                    fill="url(#icon-ppt_svg__paint3_linear_2879_20873)">
                                                                                </rect>
                                                                                <rect x="1.387" y="9.789" width="12.713"
                                                                                    height="12.702" rx="1.75"
                                                                                    stroke="url(#icon-ppt_svg__paint4_linear_2879_20873)"
                                                                                    stroke-width="0.5"></rect>
                                                                            </g>
                                                                            <g
                                                                                filter="url(#icon-ppt_svg__filter2_d_2879_20873)">
                                                                                <path
                                                                                    d="M5.237 13.429h2.606c1.496 0 2.244.634 2.244 1.91 0 1.285-.757 1.927-2.262 1.927H6.197v2.447h-.96V13.43zm.96.819v2.2h1.566c.476 0 .819-.088 1.039-.264.211-.176.326-.458.326-.845 0-.387-.115-.669-.335-.828-.22-.175-.563-.263-1.03-.263H6.197z"
                                                                                    fill="#fff"></path>
                                                                            </g>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-ppt_svg__paint0_linear_2879_20873"
                                                                                    x1="-28.782" y1="4.496" x2="-28.782"
                                                                                    y2="94.489"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#E53D2E"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#F4715A"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-ppt_svg__paint1_linear_2879_20873"
                                                                                    x1="0.616" y1="4.496" x2="0.616"
                                                                                    y2="20.118"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop offset="0.001"
                                                                                        stop-color="#D91B0A"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#E5381A"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-ppt_svg__paint2_linear_2879_20873"
                                                                                    x1="45.621" y1="4.496" x2="45.621"
                                                                                    y2="51.95"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#EB5143"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#F78978"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-ppt_svg__paint3_linear_2879_20873"
                                                                                    x1="-5.168" y1="16.691" x2="9.135"
                                                                                    y2="31.362"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"
                                                                                        stop-opacity="0.2"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#FA6942"
                                                                                        stop-opacity="0.64"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-ppt_svg__paint4_linear_2879_20873"
                                                                                    x1="-5.047" y1="16.124" x2="8.124"
                                                                                    y2="28.493"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"
                                                                                        stop-opacity="0.5"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#FF6F49"
                                                                                        stop-opacity="0.5"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-ppt_svg__filter0_f_2879_20873"
                                                                                    x="1.865" y="3.924" width="19.685"
                                                                                    height="24.96"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="BackgroundImageFix"
                                                                                        result="shape"></feBlend>
                                                                                    <feGaussianBlur stdDeviation="2.873"
                                                                                        result="effect1_foregroundBlur_2879_20873">
                                                                                    </feGaussianBlur>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-ppt_svg__filter1_bd_2879_20873"
                                                                                    x="-3.173" y="5.229" width="21.833"
                                                                                    height="21.822"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="2.155">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2879_20873">
                                                                                    </feComposite>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="2" dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="1">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.164035 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend
                                                                                        in2="effect1_backgroundBlur_2879_20873"
                                                                                        result="effect2_dropShadow_2879_20873">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect2_dropShadow_2879_20873"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-ppt_svg__filter2_d_2879_20873"
                                                                                    x="3.237" y="12.429" width="8.85"
                                                                                    height="10.284"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="1">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.917431 0 0 0 0 0.159571 0 0 0 0 0.159571 0 0 0 0.462877 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_2879_20873">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_2879_20873"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                            </defs>
                                                                        </svg></span><i>ppt/pptx</i></span><span
                                                                    class="uploader-icon"><span
                                                                        class="uploader-icon-images"><svg width="33"
                                                                            height="33" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.01" fill="#D8D8D8"
                                                                                stroke="#979797" stroke-width="0.333"
                                                                                d="M1.09.667h31.485v31.667H1.09z">
                                                                            </path>
                                                                            <path opacity="0.829" fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M8.877 6c0-.737.597-1.333 1.334-1.333H22.52l5.58 6v14.666c0 .737-.596 1.334-1.332 1.334H10.21a1.333 1.333 0 01-1.334-1.334V6z"
                                                                                fill="url(#icon-txt_svg__paint0_radial_2870_5155)">
                                                                            </path>
                                                                            <g
                                                                                filter="url(#icon-txt_svg__filter0_d_2870_5155)">
                                                                                <path fill-rule="evenodd"
                                                                                    clip-rule="evenodd"
                                                                                    d="M22.52 4.667l5.58 6h-4.247a1.333 1.333 0 01-1.334-1.334V4.666z"
                                                                                    fill="#93B4F5"></path>
                                                                            </g>
                                                                            <rect x="16.268" y="16.843" width="8.783"
                                                                                height="2.333" rx="1.167"
                                                                                fill="url(#icon-txt_svg__paint1_linear_2870_5155)">
                                                                            </rect>
                                                                            <rect x="16.268" y="21.52" width="8.783"
                                                                                height="2.333" rx="1.167"
                                                                                fill="url(#icon-txt_svg__paint2_linear_2870_5155)">
                                                                            </rect>
                                                                            <rect x="11.296" y="12.166" width="13.755"
                                                                                height="2.333" rx="1.167"
                                                                                fill="url(#icon-txt_svg__paint3_linear_2870_5155)">
                                                                            </rect>
                                                                            <g clip-path="url(#icon-txt_svg__clip0_2870_5155)"
                                                                                filter="url(#icon-txt_svg__filter1_d_2870_5155)">
                                                                                <g
                                                                                    filter="url(#icon-txt_svg__filter2_b_2870_5155)">
                                                                                    <rect x="2.249" y="10.499"
                                                                                        width="19.224" height="11.333"
                                                                                        rx="2.667" fill="#3B45C0"
                                                                                        fill-opacity="0.2"></rect>
                                                                                    <rect x="2.515" y="10.766"
                                                                                        width="18.69" height="10.8"
                                                                                        rx="2.4"
                                                                                        stroke="url(#icon-txt_svg__paint4_linear_2870_5155)"
                                                                                        stroke-width="0.533"></rect>
                                                                                </g>
                                                                                <path
                                                                                    d="M5.695 13.74h3.9v.62H8.01v4.14h-.72v-4.14H5.695v-.62zm4.155 0h.887l1.16 1.72 1.16-1.72h.886l-1.613 2.3 1.727 2.46h-.887l-1.273-1.887-1.274 1.887h-.886l1.713-2.46-1.6-2.3zm4.341 0h3.9v.62h-1.586v4.14h-.72v-4.14H14.19v-.62z"
                                                                                    fill="#fff"></path>
                                                                            </g>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-txt_svg__paint1_linear_2870_5155"
                                                                                    x1="2.705" y1="21.246" x2="27.067"
                                                                                    y2="21.246"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#8A9BFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-txt_svg__paint2_linear_2870_5155"
                                                                                    x1="2.705" y1="25.922" x2="27.067"
                                                                                    y2="25.922"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#8A9BFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-txt_svg__paint3_linear_2870_5155"
                                                                                    x1="-9.944" y1="16.569" x2="28.207"
                                                                                    y2="16.569"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#8A9BFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-txt_svg__paint4_linear_2870_5155"
                                                                                    x1="33.227" y1="17.015" x2="23.608"
                                                                                    y2="-0.494"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#3844D7"></stop>
                                                                                    <stop offset="0.999"
                                                                                        stop-color="#A5C4FF"
                                                                                        stop-opacity="0.103"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-txt_svg__filter0_d_2870_5155"
                                                                                    x="20.52" y="4.167" width="7.581"
                                                                                    height="8"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="-1" dy="0.5">
                                                                                    </feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.121867 0 0 0 0 0.159867 0 0 0 0 0.627264 0 0 0 0.648519 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_2870_5155">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_2870_5155"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-txt_svg__filter1_d_2870_5155"
                                                                                    x="2.249" y="10.415" width="21.389"
                                                                                    height="13.5"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="1" dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.5">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.145098 0 0 0 0 0.176471 0 0 0 0 0.564706 0 0 0 0.3 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_2870_5155">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_2870_5155"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-txt_svg__filter2_b_2870_5155"
                                                                                    x="-0.651" y="7.6" width="25.023"
                                                                                    height="17.133"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="1.45">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_2870_5155">
                                                                                    </feComposite>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_backgroundBlur_2870_5155"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <radialGradient
                                                                                    id="icon-txt_svg__paint0_radial_2870_5155"
                                                                                    cx="0" cy="0" r="1"
                                                                                    gradientUnits="userSpaceOnUse"
                                                                                    gradientTransform="rotate(-130.583 29.065 10.554) scale(45.8582 45.3231)">
                                                                                    <stop stop-color="#706EE2"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#404BCB"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#3B45C0"></stop>
                                                                                </radialGradient>
                                                                                <clipPath
                                                                                    id="icon-txt_svg__clip0_2870_5155">
                                                                                    <path fill="#fff"
                                                                                        transform="translate(2.249 10.415)"
                                                                                        d="M0 0h19.389v11.5H0z"></path>
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg></span><i>txt</i></span><span
                                                                    class="uploader-icon"><span
                                                                        class="uploader-icon-images"><svg width="33"
                                                                            height="33" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.01" fill="#D8D8D8"
                                                                                stroke="#979797" stroke-width="0.333"
                                                                                d="M.917.667h31.485v31.667H.917z">
                                                                            </path>
                                                                            <path opacity="0.728" fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M8.705 6c0-.737.597-1.333 1.333-1.333h12.31l5.58 6v14.666c0 .737-.597 1.334-1.333 1.334H10.038a1.333 1.333 0 01-1.333-1.334V6z"
                                                                                fill="url(#icon-xml_svg__paint0_radial_6678_1370)">
                                                                            </path>
                                                                            <path fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M22.347 4.667l5.58 6H23.68a1.333 1.333 0 01-1.333-1.334V4.666z"
                                                                                fill="#DA88FF"></path>
                                                                            <rect x="16.095" y="16.843" width="8.783"
                                                                                height="2.333" rx="1.167"
                                                                                fill="url(#icon-xml_svg__paint1_linear_6678_1370)">
                                                                            </rect>
                                                                            <rect x="16.095" y="21.52" width="8.783"
                                                                                height="2.333" rx="1.167"
                                                                                fill="url(#icon-xml_svg__paint2_linear_6678_1370)">
                                                                            </rect>
                                                                            <rect x="11.123" y="12.166" width="13.755"
                                                                                height="2.333" rx="1.167"
                                                                                fill="url(#icon-xml_svg__paint3_linear_6678_1370)">
                                                                            </rect>
                                                                            <g clip-path="url(#icon-xml_svg__clip0_6678_1370)"
                                                                                filter="url(#icon-xml_svg__filter0_d_6678_1370)">
                                                                                <g
                                                                                    filter="url(#icon-xml_svg__filter1_b_6678_1370)">
                                                                                    <rect x="2.076" y="10.499"
                                                                                        width="19.224" height="11.333"
                                                                                        rx="2.667" fill="#7F3BC0"
                                                                                        fill-opacity="0.2"></rect>
                                                                                    <rect x="2.342" y="10.766"
                                                                                        width="18.69" height="10.8"
                                                                                        rx="2.4"
                                                                                        stroke="url(#icon-xml_svg__paint4_linear_6678_1370)"
                                                                                        stroke-width="0.533"></rect>
                                                                                </g>
                                                                                <path
                                                                                    d="M4.967 13.74h.887l1.16 1.72 1.16-1.72h.887l-1.614 2.3 1.727 2.46h-.887l-1.273-1.887L5.74 18.5h-.887l1.713-2.46-1.6-2.3zm4.708 0h.86l1.66 3.813h.02l1.654-3.814h.86v4.76h-.727v-3.4h-.027l-1.46 3.4h-.626l-1.46-3.4h-.027v3.4h-.727v-4.76zm5.99 0h.72v4.14h2.62v.62h-3.34v-4.76z"
                                                                                    fill="#fff"></path>
                                                                            </g>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-xml_svg__paint1_linear_6678_1370"
                                                                                    x1="2.532" y1="21.246" x2="26.894"
                                                                                    y2="21.246"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#D78AFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-xml_svg__paint2_linear_6678_1370"
                                                                                    x1="2.532" y1="25.922" x2="26.894"
                                                                                    y2="25.922"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#D78AFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-xml_svg__paint3_linear_6678_1370"
                                                                                    x1="-10.117" y1="16.569" x2="28.035"
                                                                                    y2="16.569"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#D78AFF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-xml_svg__paint4_linear_6678_1370"
                                                                                    x1="33.054" y1="17.015" x2="23.435"
                                                                                    y2="-0.494"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#D738D6"></stop>
                                                                                    <stop offset="0.999"
                                                                                        stop-color="#E7A5FF"
                                                                                        stop-opacity="0.103"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-xml_svg__filter0_d_6678_1370"
                                                                                    x="1.576" y="9.915" width="22.389"
                                                                                    height="14.5"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="1" dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.75">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.505882 0 0 0 0 0.121569 0 0 0 0 0.627451 0 0 0 0.5 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_6678_1370">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_6678_1370"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-xml_svg__filter1_b_6678_1370"
                                                                                    x="-0.824" y="7.6" width="25.022"
                                                                                    height="17.133"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="1.45">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_6678_1370">
                                                                                    </feComposite>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_backgroundBlur_6678_1370"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <radialGradient
                                                                                    id="icon-xml_svg__paint0_radial_6678_1370"
                                                                                    cx="0" cy="0" r="1"
                                                                                    gradientUnits="userSpaceOnUse"
                                                                                    gradientTransform="rotate(-130.583 28.979 10.594) scale(45.8582 45.3231)">
                                                                                    <stop stop-color="#8D1BB5"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#BF44D0"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#3B45C0"></stop>
                                                                                </radialGradient>
                                                                                <clipPath
                                                                                    id="icon-xml_svg__clip0_6678_1370">
                                                                                    <path fill="#fff"
                                                                                        transform="translate(2.076 10.415)"
                                                                                        d="M0 0h19.389v11.5H0z"></path>
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg></span><i>xml</i></span><span
                                                                    class="uploader-icon"><span
                                                                        class="uploader-icon-images"
                                                                        style="margin-top: -2px;"><svg width="32"
                                                                            height="33" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.728" fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M9.212 4.5h12.317l5.58 6v14.667a1.33 1.33 0 01-1.325 1.333H9.212a1.33 1.33 0 01-1.326-1.333V5.833A1.33 1.33 0 019.212 4.5z"
                                                                                fill="url(#icon-html_svg__paint0_radial_6675_5028)">
                                                                            </path>
                                                                            <g
                                                                                filter="url(#icon-html_svg__filter0_d_6675_5028)">
                                                                                <path
                                                                                    d="M21.529 4.5l5.58 6h-4.254a1.33 1.33 0 01-1.326-1.333V4.5z"
                                                                                    fill="#000"></path>
                                                                            </g>
                                                                            <path
                                                                                d="M21.529 4.5l5.58 6h-4.254a1.33 1.33 0 01-1.326-1.333V4.5z"
                                                                                fill="#79D5DF"></path>
                                                                            <path
                                                                                d="M22.899 16.677h-6.463c-.641 0-1.16.522-1.16 1.166 0 .645.519 1.167 1.16 1.167h6.463c.64 0 1.16-.522 1.16-1.167 0-.644-.52-1.166-1.16-1.166z"
                                                                                fill="url(#icon-html_svg__paint1_linear_6675_5028)">
                                                                            </path>
                                                                            <path
                                                                                d="M22.899 21.354h-6.463c-.641 0-1.16.522-1.16 1.166 0 .645.519 1.167 1.16 1.167h6.463c.64 0 1.16-.523 1.16-1.167s-.52-1.166-1.16-1.166z"
                                                                                fill="url(#icon-html_svg__paint2_linear_6675_5028)">
                                                                            </path>
                                                                            <path
                                                                                d="M22.899 12H11.464c-.64 0-1.16.522-1.16 1.167 0 .644.52 1.166 1.16 1.166h11.435c.64 0 1.16-.522 1.16-1.166 0-.645-.52-1.167-1.16-1.167z"
                                                                                fill="url(#icon-html_svg__paint3_linear_6675_5028)">
                                                                            </path>
                                                                            <g
                                                                                filter="url(#icon-html_svg__filter1_bd_6675_5028)">
                                                                                <path
                                                                                    d="M18.235 10.5H3.834c-1.515 0-2.743 1.159-2.743 2.588v5.824c0 1.43 1.228 2.588 2.743 2.588h14.4c1.515 0 2.743-1.159 2.743-2.588v-5.824c0-1.43-1.228-2.588-2.742-2.588z"
                                                                                    fill="url(#icon-html_svg__paint4_linear_6675_5028)"
                                                                                    fill-opacity="0.5"></path>
                                                                                <path
                                                                                    d="M3.834 10.75h14.4c1.391 0 2.493 1.06 2.493 2.338v5.824c0 1.278-1.102 2.338-2.492 2.338H3.834c-1.39 0-2.493-1.06-2.493-2.338v-5.824c0-1.278 1.102-2.338 2.493-2.338z"
                                                                                    stroke="url(#icon-html_svg__paint5_linear_6675_5028)"
                                                                                    stroke-width="0.5"></path>
                                                                            </g>
                                                                            <path
                                                                                d="M2.055 13.906h.726v2.007h2.494v-2.007H6v4.76h-.726v-2.133H2.78v2.133h-.726v-4.76zm4.516 0h3.9v.62H8.884v4.14h-.72v-4.14H6.571v-.62zm4.475 0h.86l1.66 3.813h.02l1.653-3.813h.86v4.76h-.727v-3.4h-.026l-1.46 3.4h-.627l-1.46-3.4h-.027v3.4h-.726v-4.76zm-8.991 9h.72v4.14h2.62v.62h-3.34v-4.76z"
                                                                                fill="#fff"></path>
                                                                            <defs>
                                                                                <linearGradient
                                                                                    id="icon-html_svg__paint1_linear_6675_5028"
                                                                                    x1="1.713" y1="17.843" x2="26.074"
                                                                                    y2="17.843"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#79D5DF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-html_svg__paint2_linear_6675_5028"
                                                                                    x1="1.713" y1="22.52" x2="26.074"
                                                                                    y2="22.52"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#79D5DF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-html_svg__paint3_linear_6675_5028"
                                                                                    x1="-10.936" y1="13.167" x2="27.215"
                                                                                    y2="13.167"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#79D5DF"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-html_svg__paint4_linear_6675_5028"
                                                                                    x1="1.262" y1="15.838" x2="20.806"
                                                                                    y2="15.838"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#fff"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#3B9DC0"
                                                                                        stop-opacity="0.15"></stop>
                                                                                </linearGradient>
                                                                                <linearGradient
                                                                                    id="icon-html_svg__paint5_linear_6675_5028"
                                                                                    x1="22.349" y1="21.177" x2="-5.674"
                                                                                    y2="1.728"
                                                                                    gradientUnits="userSpaceOnUse">
                                                                                    <stop stop-color="#28A1B3"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#28A1B3"
                                                                                        stop-opacity="0"></stop>
                                                                                </linearGradient>
                                                                                <filter
                                                                                    id="icon-html_svg__filter0_d_6675_5028"
                                                                                    x="19.529" y="3.5" width="8.581"
                                                                                    height="9"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="-0.5" dy="0.5">
                                                                                    </feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.75">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.237609 0 0 0 0 0.589697 0 0 0 0 0.615149 0 0 0 1 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend in2="BackgroundImageFix"
                                                                                        result="effect1_dropShadow_6675_5028">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect1_dropShadow_6675_5028"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <filter
                                                                                    id="icon-html_svg__filter1_bd_6675_5028"
                                                                                    x="-1.909" y="7.5" width="25.887"
                                                                                    height="17"
                                                                                    filterUnits="userSpaceOnUse"
                                                                                    color-interpolation-filters="sRGB">
                                                                                    <feFlood flood-opacity="0"
                                                                                        result="BackgroundImageFix">
                                                                                    </feFlood>
                                                                                    <feGaussianBlur
                                                                                        in="BackgroundImageFix"
                                                                                        stdDeviation="1.5">
                                                                                    </feGaussianBlur>
                                                                                    <feComposite in2="SourceAlpha"
                                                                                        operator="in"
                                                                                        result="effect1_backgroundBlur_6675_5028">
                                                                                    </feComposite>
                                                                                    <feColorMatrix in="SourceAlpha"
                                                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                                        result="hardAlpha">
                                                                                    </feColorMatrix>
                                                                                    <feOffset dx="1" dy="1"></feOffset>
                                                                                    <feGaussianBlur stdDeviation="0.75">
                                                                                    </feGaussianBlur>
                                                                                    <feColorMatrix
                                                                                        values="0 0 0 0 0.205556 0 0 0 0 0.574346 0 0 0 0 0.616667 0 0 0 0.7 0">
                                                                                    </feColorMatrix>
                                                                                    <feBlend
                                                                                        in2="effect1_backgroundBlur_6675_5028"
                                                                                        result="effect2_dropShadow_6675_5028">
                                                                                    </feBlend>
                                                                                    <feBlend in="SourceGraphic"
                                                                                        in2="effect2_dropShadow_6675_5028"
                                                                                        result="shape"></feBlend>
                                                                                </filter>
                                                                                <radialGradient
                                                                                    id="icon-html_svg__paint0_radial_6675_5028"
                                                                                    cx="0" cy="0" r="1"
                                                                                    gradientUnits="userSpaceOnUse"
                                                                                    gradientTransform="rotate(-176.97 13.072 8.035) scale(23.6481 27.3589)">
                                                                                    <stop stop-color="#1E8D8D"></stop>
                                                                                    <stop offset="1"
                                                                                        stop-color="#279BA6"></stop>
                                                                                </radialGradient>
                                                                            </defs>
                                                                        </svg></span><i>htm/html</i></span>
                                                            </div>`
})

new Vue({
    el: "#app",
    data() {
        return {
            btnLoading: false,
            dialogOpen: false,
            uploaderSuc: false,
            licon:'flag-icon-gb',
            ricon:'flag-icon-cn',
            yiwenType:'',
            fileName: '',
            type: false,
            identifier: "",
            suc: false,
            tid: null,
            ltid: null,
            timerId: null,
            url: null,
            fileUrl: '',
            lfileUrl: '',
            fileType: null,
            lsuc: false,
            rsuc: false,
            selectOptions1: [
                {
                    value: 'en',
                    label: '英文',
                    flagClass: 'flag-icon-gb'
                },
                {
                    value: 'zh',
                    label: '中文',
                    flagClass: 'flag-icon-cn'
                },
                {
                    value: 'jp',
                    label: '日文',
                    flagClass: 'flag-icon-jp'
                },
                {
                    value: 'kor',
                    label: '韩文',
                    flagClass: 'flag-icon-kr'
                },
                {
                    value: 'fra',
                    label: '法文',
                    flagClass: 'flag-icon-fr'
                }
            ],
            selectOptions2: [
                {
                    value: 'en',
                    label: '英文',
                    flagClass: 'flag-icon-gb'
                },
                {
                    value: 'zh',
                    label: '中文',
                    flagClass: 'flag-icon-cn'
                },
                {
                    value: 'jp',
                    label: '日文',
                    flagClass: 'flag-icon-jp'
                },
                {
                    value: 'kor',
                    label: '韩文',
                    flagClass: 'flag-icon-kr'
                },
                {
                    value: 'fra',
                    label: '法文',
                    flagClass: 'flag-icon-fr'
                }
            ],
            selectValue1: 'en',//原文语言
            selectValue2: 'zh',//译文语言
            textareaFrom: '',
            textareaTo: '',
            tableList: {
                list1: '原文语言',
                list2: '译文',
                list3: '时间',
                // list4:'删除记录',
                list4: '',
                list5: '译文语言'
            },
            tableList2: {
                list1: '原文语言',
                list2: '译文',
                list3: '时间',
                // list4:'删除记录',
                list4: '',
                list5: '译文语言'
            },
            history: [],
            favorites: [],
            isPhone: false,
            attrs: {
                accept: '.pptx,.html,.ppt,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            options: {
                // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
                target: 'http://localhost:3000/upload',
                testChunks: false
            },
        }
    },
    created() {
        const that = this
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        console.log(window.screenWidth)
        if (window.screenWidth <= 750) {
            that.isPhone = true
        } else {
            that.isPhone = false
        }
        /**
         * 读取 cookie 
         */
        /**
         * 如果没有Cookie 创建
         */
        // 历史翻译记录 如果不存在cookie 创建一个
        const his = []
        if (!cookie('history')) {
            try {
                cookie.set('history', JSON.stringify(his), 0.375)
            } catch (e) { }
        }
        // 收藏夹 如果不存在cookie 创建一个
        if (!cookie('favorites')) {
            try {
                cookie.set('favorites', JSON.stringify(his), 3650)
            } catch (e) { }
        }
        // 读取到data中
        this.history = JSON.parse(cookie('history'))
        this.favorites = JSON.parse(cookie('favorites'))
        console.log(cookie())
        console.log(JSON.parse(cookie('history')))
        console.log(JSON.parse(cookie('favorites')))
    },
    mounted() {
        if (this.$refs.lInput) {
            const textareaElement = this.$refs.lInput.$el.querySelector('textarea');
            textareaElement.style.border = 'none';
            textareaElement.style.outline = 'none'; // 去掉焦点时的轮廓
        }
        if (this.$refs.lSelect) {
            const lselectElement = this.$refs.lSelect.$el.querySelector('.el-input__inner');
            lselectElement.style.border = 'none';
            lselectElement.style.boxShadow = 'none';
            lselectElement.style.height = '41px';
        }
        if (this.$refs.rSelect) {
            const rselectElement = this.$refs.rSelect.$el.querySelector('.el-input__inner');
            rselectElement.style.border = 'none';
            rselectElement.style.boxShadow = 'none';
            rselectElement.style.height = '41px';
        }

        if (this.$refs.rInput) {
            // 修改 textarea 的样式，去掉边框
            const rtextareaElement = this.$refs.rInput.$el.querySelector('textarea');
            rtextareaElement.style.border = 'none';
            rtextareaElement.style.outline = 'none'; // 去掉焦点时的轮廓
        }
        /**
         * 监控 窗口 实现 部分 控件的显示和隐藏
         */
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
                console.log(window.screenWidth)
                if (window.screenWidth <= 750) {
                    that.isPhone = true
                } else {
                    that.isPhone = false
                }
            })()
        }
    },
    watch: {
        btnLoading(val) {
            if (val) {
                console.log(val)
                this.timerId = setInterval(() => {
                    if (!this.lsuc)
                        this.queryRes();
                    if (!this.rsuc)
                        this.queryRRes();
                }, 1000);
            } else {
                clearInterval(this.timerId);
            }
        },
        suc(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.setupSyncScrolling();
                });
            }
        },
        selectValue1(newVal){
            switch(newVal){
                case 'en':{
                    this.licon='flag-icon-gb'
                    break;
                }
                case 'zh':{
                    this.licon='flag-icon-cn'
                    break;
                }
                case 'jp':{
                    this.licon='flag-icon-jp'
                    break;
                }
                case 'kor':{
                    this.licon='flag-icon-kr'
                    break;
                }
                case 'fra':{
                    this.licon='flag-icon-fr'
                    this.break;
                }
            }
        },
        selectValue2(newVal){
            switch(newVal){
                case 'en':{
                    this.ricon='flag-icon-gb'
                    break;
                }
                case 'zh':{
                    this.ricon='flag-icon-cn'
                    break;
                }
                case 'jp':{
                    this.ricon='flag-icon-jp'
                    break;
                }
                case 'kor':{
                    this.ricon='flag-icon-kr'
                    break;
                }
                case 'fra':{
                    this.ricon='flag-icon-fr'
                    break;
                }
            }
        },
    },
    methods: {
        youDao() {
            /**
             * 处理请求参数
             */
            var appid = '20240603002068567';
            var key = 'Jck4366oyBJx4cWsZABL';//注意：暴露appSecret，有被盗用造成损失的风险
            var salt = (new Date).getTime();
            var curtime = Math.round(new Date().getTime() / 1000);
            var query = this.textareaFrom;
            // var from = 'zh-CHS';
            var from = this.selectValue1;
            // var to = 'en';
            var to = this.selectValue2;
            // console.log('---',str1);

            var sign = MD5(appid + query + salt + key);
            const that = this
            $.ajax({
                url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
                type: 'get',
                dataType: 'jsonp',
                data: {
                    q: query,
                    appid: appid,
                    salt: salt,
                    from: from,
                    to: to,
                    sign: sign,
                },
                success: function (data) {
                    // 渲染 翻译结果 
                    that.textareaTo = data.trans_result[0].dst
                    /**
                     * 调用 函数 把结果保存到cookie
                     */
                    that.textareaFromChange()
                }
                // headers:{
                //     referer:'',
                //     host:'10.63.0.43:5500'
                // },
                // url:'https://fanyi.baidu.com/langdetect',
                //  type: 'post',
                // dataType: 'jsonp',
                // data: {
                //    query:'time'
                // },
                // success: function (data) {
                //     console.log(data)
                // } 
            })
            function truncate(q) {
                var len = q.length;
                if (len <= 20) return q;
                return q.substring(0, 10) + len + q.substring(len - 10, len);
            }
            function str2utf8(str) {
                encoder = new TextEncoder('utf8');
                return encoder.encode(str);
            }
        },
        del(index, num, type) {
            console.log(type)
            if (num === '1') {
                if (type === 'h') {
                    this.history.splice(index, num)
                } else if (type === 'f') {
                    this.favorites.splice(index, num)
                }
            } else if (num === 'all') {
                if (type === 'h') {
                    this.history = []
                } else if (type === 'f') {
                    this.favorites = []
                }
            }
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            // 更新 Cookie
            cookie.set('history', JSON.stringify(this.history), 0.375)
            cookie.set('favorites', JSON.stringify(this.favorites), 3650)
        },
        textareaFromChange() {
            /**
             * 添加 翻译 记录
             */
            const time = new Date()
            const h = time.getHours()//时
            const m = time.getMinutes()//分
            const addHistory = {
                originalText: this.textareaFrom,
                translation: this.textareaTo,
                time: h + ':' + m,
                isFav: false
            }
            // const addFavorites = {
            //     originalText: this.textareaFrom,
            //     translation: this.textareaTo,
            //     time: h+':'+m,
            //     isFav:false
            // }
            this.history.unshift(addHistory)
            // this.favorites.unshift(addFavorites)
            /**
             * 把记录保存到cookie内 
             */
            cookie.set('history', JSON.stringify(this.history), 0.1)
            // cookie.set('favorites',JSON.stringify(this.favorites), 3650)   
        },
        addFavorites() {
            const time = new Date()
            const h = time.getHours()//时
            const m = time.getMinutes()//分
            if (this.textareaFrom !== '' && this.textareaTo !== '') {
                this.favorites.unshift({
                    originalText: this.textareaFrom,
                    translation: this.textareaTo,
                    time: h + ':' + m,
                    isFav: true
                })
                this.$message({
                    message: '收藏成功',
                    type: 'success'
                });
            } else {
                this.$message.error('无法收藏空内容');
            }
        },
        copyFrom(){
            const that = this
            copyToClip(this.textareaFrom, '已经成功复制到剪贴板')
            function copyToClip(content, message) {
                if (content !== '') {
                    var aux = document.createElement("input");
                    aux.setAttribute("value", content);
                    document.body.appendChild(aux);
                    aux.select();
                    document.execCommand("copy");
                    document.body.removeChild(aux);
                    that.$message({
                        message: message,
                        type: 'success'
                    });
                } else {
                    that.$message.error('建议您先去翻译一下再来复制哦!');
                }
            }
        },
        copy() {
            const that = this
            copyToClip(this.textareaTo, '已经成功复制到剪贴板')
            function copyToClip(content, message) {
                if (content !== '') {
                    var aux = document.createElement("input");
                    aux.setAttribute("value", content);
                    document.body.appendChild(aux);
                    aux.select();
                    document.execCommand("copy");
                    document.body.removeChild(aux);
                    that.$message({
                        message: message,
                        type: 'success'
                    });
                } else {
                    that.$message.error('建议您先去翻译一下再来复制哦!');
                }
            }
        },
        add(index, num, type, scop, how) {
            if (how) {
                // console.log( this.history[scop.$index] )
                this.favorites.unshift(this.history[index])
                cookie.set('favorites', JSON.stringify(this.favorites), 0.375)
                // this.history[index].isFav = !this.history[index].isFav 
                // console.log( this.history[index].isFav )
            } else {
                this.favorites.splice(0, 1)
                cookie.set('favorites', JSON.stringify(this.favorites), 0.375)
            }
            this.history[index].isFav = !this.history[index].isFav
        },
        handleFileAdded(files, event) {
            console.log(files)
            // 将文件信息传递给父组件
            switch (files.fileType) {
                case "application/pdf": {
                    this.fileType = "pdf"
                    break;
                }
                case "text/plain": {
                    this.fileType = "txt"
                    break;
                }
                case "text/xml": {
                    this.fileType = "xml"
                }
                case "text/html": {
                    this.fileType = "html"
                    break;
                }
                case "application/vnd.ms-excel": {
                    this.fileType = "xls"
                    break;
                }
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                    this.fileType = "xlsx"
                    break;
                }
                case "application/vnd.ms-powerpoint": {
                    this.fileType = "ppt"
                    break;
                }
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
                    this.fileType = "docx";
                    break;
                }
                case "application/msword": {
                    this.fileType = "doc";
                    break;
                }
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
                    this.fileType = "pptx"
                    break;
                }
            }
        },
        fileSuccess(rootFile, file, message, chunk) {
            this.identifier = "uploader-" + rootFile.uniqueIdentifier + ".1";
            console.log(this.identifier)
            this.uploaderSuc = true;
            this.type = true;
            this.fileName = file.name;
        },
        openDialog() {
            this.dialogOpen = true;
        },
        closeDialog() {
            this.dialogOpen = false;
        },
        transDoc() {
            this.$notify({
                title: '警告',
                message: '请选择正确的翻译语言方向，否则将无法翻译文档！',
                type: 'warning',
                duration: 2000,// 设置持续时间为 10000 毫秒 (10 秒)
                customClass: 'custom-notification' // 使用自定义样式
              });
              setTimeout(() => {
                if (!this.identifier) {
                    this.$message({
                        type: 'warning',
                        message: '请上传文件后再进行文档翻译'
                    });
                    return;
                }
                switch(this.selectValue1){
                    case 'zh':{
                        this.yiwenType='中文-'
                        break;
                    }
                    case 'en':{
                        this.yiwenType='英文-'
                        break;
                    }
                    case 'jp':{
                        this.yiwenType='日语-'
                        break;
                    }
                    case 'kor':{
                        this.yiwenType='韩语-'
                        break;
                    }
                    case 'fra':{
                        this.yiwenType='法语-'
                        break;
                    }
                }
    
                switch(this.selectValue2){
                    case 'zh':{
                        this.yiwenType+='中文'
                        break;
                    }
                    case 'en':{
                        this.yiwenType+='英语'
                        break;
                    }
                    case 'jp':{
                        this.yiwenType+='日语'
                        break;
                    }
                    case 'kor':{
                        this.yiwenType+='韩语'
                        break;
                    }
                    case 'fra':{
                        this.yiwenType+='法语'
                        break;
                    }
                }
    
                const that = this;
                $.ajax({
                    url: 'http://localhost:3000/translate',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        identifier: this.identifier,
                        from: this.selectValue1,
                        to: this.selectValue2,
                        format: this.fileType
                    }),
                    success: function (data) {
                        that.tid = data.tid;
                        that.ltid = data.ltid;
                        that.btnLoading = true;
                    }
                })
            }, 2000);
        },
        downloadFile() {
            const fileUrl = "http://localhost:3000/downloadFile/" + this.url;
            window.open(fileUrl);
        },
        setupSyncScrolling() {
            const container1 = this.$refs.pdfContainer1;
            const container2 = this.$refs.pdfContainer2;

            container1.addEventListener('scroll', () => {
                container2.scrollTop = container1.scrollTop;
            });

            container2.addEventListener('scroll', () => {
                container1.scrollTop = container2.scrollTop;
            });
        },
        queryRes() {
            const that = this;
            $.ajax({
                url: 'http://localhost:3000/queryRes',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    tid: this.tid,
                }),
                success: function (data) {
                    if (data.data.status == 314) {
                        that.lsuc = true;
                        if (that.lsuc && that.rsuc) {
                            that.btnLoading = false;
                            that.suc = true;
                        }
                        $.ajax({
                            url: 'http://localhost:3000/download',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                tid: that.tid,
                            }),
                            success: function (data) {
                                that.url = data.url
                                that.fileUrl = "http://localhost:3000/static/" + data.url;
                            }
                        })
                    }
                }
            })
        },
        queryRRes() {
            const that = this;
            $.ajax({
                url: 'http://localhost:3000/queryRes',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    tid: this.ltid,
                }),
                success: function (data) {
                    if (data.data.status == 314) {
                        that.rsuc = true;
                        if (that.lsuc && that.rsuc) {
                            that.btnLoading = false;
                            that.suc = true;
                        }
                        $.ajax({
                            url: 'http://localhost:3000/download',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                tid: that.ltid,
                            }),
                            success: function (data) {
                                that.lfileUrl = "http://localhost:3000/static/" + data.url;
                            }
                        })
                    }
                }
            })
        },
        fangda(){
            const pdfViewer1=this.$refs.pdfViewer1;
            pdfViewer1.zoomIn();
            const pdfViewer2=this.$refs.pdfViewer2;
            pdfViewer2.zoomIn();
        },
        suoxiao(){
            const pdfViewer1=this.$refs.pdfViewer1;
            pdfViewer1.zoomOut();
            const pdfViewer2=this.$refs.pdfViewer2;
            pdfViewer2.zoomOut();
        }
    }
})