(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LoginPage() {
    _s();
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loginError, setLoginError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const validateEmail = (email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoginError('');
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const result = await login(email, password);
            if (!result.success) {
                setLoginError(result.error || 'Login failed. Please try again.');
            }
        } catch  {
            setLoginError('An unexpected error occurred. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-bg-page p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-card-surface rounded-2xl border border-border p-8 sm:p-12 w-full max-w-md shadow-sm animate-fade-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-trove-green rounded-2xl flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-white",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 3v18h18"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 17V9"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M13 17V5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8 17v-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/login/page.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-semibold text-text-default mb-1",
                            children: "Welcome to Trove"
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-text-neutral",
                            children: "Sign in to access your portfolio"
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/login/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "flex flex-col gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "email",
                                    className: "block text-sm font-medium text-text-default mb-2",
                                    children: "Email Address"
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "email",
                                    type: "email",
                                    value: email,
                                    onChange: (e)=>{
                                        setEmail(e.target.value);
                                        if (errors.email) {
                                            setErrors((prev)=>({
                                                    ...prev,
                                                    email: undefined
                                                }));
                                        }
                                    },
                                    placeholder: "Enter your email",
                                    disabled: isLoading,
                                    className: `w-full px-4 py-3 bg-bg-default border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors ${errors.email ? 'border-negative' : 'border-border'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-negative mt-1 block",
                                    children: errors.email
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    className: "block text-sm font-medium text-text-default mb-2",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "password",
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>{
                                        setPassword(e.target.value);
                                        if (errors.password) {
                                            setErrors((prev)=>({
                                                    ...prev,
                                                    password: undefined
                                                }));
                                        }
                                    },
                                    placeholder: "Enter your password",
                                    disabled: isLoading,
                                    className: `w-full px-4 py-3 bg-bg-default border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors ${errors.password ? 'border-negative' : 'border-border'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-negative mt-1 block",
                                    children: errors.password
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        loginError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 bg-red-100 rounded-xl text-sm text-negative",
                            children: loginError
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isLoading,
                            className: "w-full flex items-center justify-center gap-2 px-6 py-3 bg-trove-green text-white rounded-xl font-medium hover:bg-trove-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Signing in..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : 'Sign In'
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/login/page.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 p-4 bg-bg-default rounded-xl text-xs text-text-neutral",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "text-text-default",
                            children: "Demo:"
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        " Use any valid email and password (min 6 chars)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/login/page.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/login/page.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/login/page.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "CKG+83KVVpuwoLDcNL8nYNv2+g4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/Portfolio_data.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "user": {
        "name": "Adaeze Okonkwo",
        "accountId": "TRV-2024-0847",
        "lastUpdated": "2025-07-01T14:32:00Z"
    },
    "summary": {
        "totalPortfolioValue": 48250.75,
        "totalInvested": 42000.0,
        "currency": "USD"
    },
    "holdings": [
        {
            "id": "h1",
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "sector": "Technology",
            "shares": 15,
            "avgCost": 178.5,
            "currentPrice": 215.3,
            "currency": "USD"
        },
        {
            "id": "h2",
            "ticker": "GOOGL",
            "name": "Alphabet Inc.",
            "sector": "Technology",
            "shares": 8,
            "avgCost": 140.25,
            "currentPrice": 176.8,
            "currency": "USD"
        },
        {
            "id": "h3",
            "ticker": "TSLA",
            "name": "Tesla Inc.",
            "sector": "Automotive",
            "shares": 10,
            "avgCost": 265.0,
            "currentPrice": 248.9,
            "currency": "USD"
        },
        {
            "id": "h4",
            "ticker": "JNJ",
            "name": "Johnson & Johnson",
            "sector": "Healthcare",
            "shares": 20,
            "avgCost": 155.0,
            "currentPrice": 162.45,
            "currency": "USD"
        },
        {
            "id": "h5",
            "ticker": "JPM",
            "name": "JPMorgan Chase & Co.",
            "sector": "Finance",
            "shares": 12,
            "avgCost": 190.75,
            "currentPrice": 205.6,
            "currency": "USD"
        },
        {
            "id": "h6",
            "ticker": "AMZN",
            "name": "Amazon.com Inc.",
            "sector": "Technology",
            "shares": 18,
            "avgCost": 178.3,
            "currentPrice": 193.15,
            "currency": "USD"
        },
        {
            "id": "h7",
            "ticker": "NVDA",
            "name": "NVIDIA Corporation",
            "sector": "Technology",
            "shares": 5,
            "avgCost": 820.0,
            "currentPrice": 0,
            "currency": "USD"
        },
        {
            "id": "h8",
            "ticker": "PFE",
            "name": "Pfizer Inc.",
            "sector": "Healthcare",
            "shares": 30,
            "avgCost": 28.5,
            "currentPrice": 26.1,
            "currency": "USD"
        },
        {
            "id": "h9",
            "ticker": "DIS",
            "name": "The Walt Disney Company",
            "sector": "Entertainment",
            "shares": 0,
            "avgCost": 98.75,
            "currentPrice": 112.4,
            "currency": "USD"
        },
        {
            "id": "h10",
            "ticker": "V",
            "name": "Visa Inc.",
            "sector": "Finance",
            "shares": 7,
            "avgCost": 275.0,
            "currentPrice": 289.35,
            "currency": "USD"
        }
    ],
    "transactions": [
        {
            "id": "t1",
            "type": "BUY",
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "shares": 5,
            "pricePerShare": 210.5,
            "totalAmount": 1052.5,
            "date": "2025-07-01T10:15:00Z",
            "status": "COMPLETED"
        },
        {
            "id": "t2",
            "type": "SELL",
            "ticker": "TSLA",
            "name": "Tesla Inc.",
            "shares": 3,
            "pricePerShare": 252.3,
            "totalAmount": 756.9,
            "date": "2025-06-28T14:22:00Z",
            "status": "COMPLETED"
        },
        {
            "id": "t3",
            "type": "BUY",
            "ticker": "NVDA",
            "name": "NVIDIA Corporation",
            "shares": 2,
            "pricePerShare": 815.0,
            "totalAmount": 1630.0,
            "date": "2025-06-25T09:45:00Z",
            "status": "COMPLETED"
        },
        {
            "id": "t4",
            "type": "BUY",
            "ticker": "JNJ",
            "name": "Johnson & Johnson",
            "shares": 10,
            "pricePerShare": 158.2,
            "totalAmount": 1582.0,
            "date": "2025-06-20T11:30:00Z",
            "status": "COMPLETED"
        },
        {
            "id": "t5",
            "type": "SELL",
            "ticker": "PFE",
            "name": "Pfizer Inc.",
            "shares": 15,
            "pricePerShare": 27.8,
            "totalAmount": 417.0,
            "date": "2025-06-18T16:05:00Z",
            "status": "COMPLETED"
        },
        {
            "id": "t6",
            "type": "BUY",
            "ticker": "AMZN",
            "name": "Amazon.com Inc.",
            "shares": 8,
            "pricePerShare": 185.4,
            "totalAmount": 1483.2,
            "date": "2025-06-15T08:50:00Z",
            "status": "PENDING"
        },
        {
            "id": "t7",
            "type": "BUY",
            "ticker": "V",
            "name": "Visa Inc.",
            "shares": 3,
            "pricePerShare": 278.9,
            "totalAmount": 836.7,
            "date": "2025-06-10T13:20:00Z",
            "status": "FAILED"
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/services/portfolioService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculatePortfolioChange",
    ()=>calculatePortfolioChange,
    "calculateSectorAllocation",
    ()=>calculateSectorAllocation,
    "fetchPortfolioData",
    ()=>fetchPortfolioData,
    "filterHoldings",
    ()=>filterHoldings,
    "filterTransactions",
    ()=>filterTransactions,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatPercentage",
    ()=>formatPercentage,
    "getAccountSummaries",
    ()=>getAccountSummaries,
    "getUniqueSectors",
    ()=>getUniqueSectors
]);
/**
 * Portfolio Service Layer
 * 
 * This service wraps the JSON data and simulates asynchronous API calls.
 * It handles data transformation and deals with intentional data quirks.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$Portfolio_data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/Portfolio_data.json.[json].cjs [app-client] (ecmascript)");
;
// Simulated delay for API calls
const SIMULATED_DELAY = 800;
// Sector colors for allocation chart
const SECTOR_COLORS = {
    'Technology': '#059A83',
    'Healthcare': '#00B6DF',
    'Finance': '#7B79C9',
    'Automotive': '#F2C891',
    'Entertainment': '#00323D'
};
const DEFAULT_COLOR = '#687D7A';
/**
 * Calculates derived fields for holdings
 * Handles data quirks:
 * 1. NVDA has currentPrice = 0 - treated as "Price unavailable"
 * 2. DIS has shares = 0 - treated as "Closed position" (excluded from portfolio)
 */ function processHoldings(holdings) {
    return holdings.filter((holding)=>{
        // Skip holdings with 0 shares (like DIS) - treated as closed positions
        // These are excluded from the active portfolio
        if (holding.shares === 0) {
            return false;
        }
        return true;
    }).map((holding)=>{
        const shares = holding.shares;
        const avgCost = holding.avgCost;
        // Handle NVDA's currentPrice = 0
        // Decision: Treat as "Price unavailable" - set currentValue to null/0
        // and mark it specially so UI can show appropriate message
        const currentPrice = holding.currentPrice === 0 ? null : holding.currentPrice;
        const currentValue = currentPrice !== null ? shares * currentPrice : 0;
        const totalCost = shares * avgCost;
        const gainLoss = currentPrice !== null ? currentValue - totalCost : null;
        const gainLossPercent = currentPrice !== null && totalCost > 0 ? (currentValue - totalCost) / totalCost * 100 : null;
        return {
            ...holding,
            currentPrice: currentPrice !== null ? currentPrice : 0,
            priceUnavailable: currentPrice === null,
            currentValue,
            totalCost,
            gainLoss,
            gainLossPercent
        };
    });
}
async function fetchPortfolioData() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const processedHoldings = processHoldings(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$Portfolio_data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].holdings);
            // Recalculate total portfolio value based on processed holdings
            const totalPortfolioValue = processedHoldings.reduce((sum, h)=>sum + (h.currentValue || 0), 0);
            resolve({
                user: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$Portfolio_data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].user,
                summary: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$Portfolio_data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].summary,
                    totalPortfolioValue
                },
                holdings: processedHoldings,
                transactions: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$Portfolio_data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].transactions.map((t)=>({
                        ...t,
                        type: t.type,
                        status: t.status
                    }))
            });
        }, SIMULATED_DELAY);
    });
}
function calculateSectorAllocation(holdings) {
    const sectorMap = new Map();
    holdings.forEach((holding)=>{
        const currentValue = holding.currentValue || 0;
        const existing = sectorMap.get(holding.sector) || 0;
        sectorMap.set(holding.sector, existing + currentValue);
    });
    const totalValue = Array.from(sectorMap.values()).reduce((sum, val)=>sum + val, 0);
    const allocations = Array.from(sectorMap.entries()).map(([sector, value])=>({
            sector,
            value,
            percentage: totalValue > 0 ? value / totalValue * 100 : 0,
            color: SECTOR_COLORS[sector] || DEFAULT_COLOR
        })).sort((a, b)=>b.value - a.value);
    return allocations;
}
function getAccountSummaries(holdings) {
    const sectorMap = new Map();
    holdings.forEach((holding)=>{
        const existing = sectorMap.get(holding.sector) || {
            positions: 0,
            totalValue: 0
        };
        sectorMap.set(holding.sector, {
            positions: existing.positions + 1,
            totalValue: existing.totalValue + (holding.currentValue || 0)
        });
    });
    return Array.from(sectorMap.entries()).map(([category, data])=>({
            category,
            positions: data.positions,
            totalValue: data.totalValue
        })).sort((a, b)=>b.totalValue - a.totalValue);
}
function filterTransactions(transactions, filter) {
    if (filter === 'ALL') return transactions;
    return transactions.filter((t)=>t.type === filter);
}
function filterHoldings(holdings, searchQuery, sectorFilter) {
    return holdings.filter((holding)=>{
        const matchesSearch = !searchQuery || holding.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || holding.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = sectorFilter === 'All' || holding.sector === sectorFilter;
        return matchesSearch && matchesSector;
    });
}
function getUniqueSectors(holdings) {
    const sectors = new Set(holdings.map((h)=>h.sector));
    return [
        'All',
        ...Array.from(sectors).sort()
    ];
}
function calculatePortfolioChange(summary) {
    const change = summary.totalPortfolioValue - summary.totalInvested;
    const changePercent = summary.totalInvested > 0 ? change / summary.totalInvested * 100 : 0;
    return {
        changePercent: Math.abs(changePercent),
        isPositive: change >= 0
    };
}
function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}
function formatPercentage(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$portfolioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/portfolioService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DashboardPage() {
    _s();
    const { logout, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('stocks');
    const [portfolioData, setPortfolioData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            loadPortfolioData();
        }
    }["DashboardPage.useEffect"], []);
    const loadPortfolioData = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$portfolioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPortfolioData"])();
            setPortfolioData(data);
        } catch (err) {
            setError('Failed to load portfolio data. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col items-center justify-center bg-bg-page gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-10 h-10 border-2 border-transparent border-t-trove-green rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-text-neutral",
                    children: "Loading your portfolio..."
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this);
    }
    if (error || !portfolioData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col items-center justify-center bg-bg-page p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-card-surface rounded-2xl border border-border p-6 max-w-md w-full text-center shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-12 h-12 mx-auto mb-4 text-negative",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "12",
                                cy: "12",
                                r: "10"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "12",
                                y1: "8",
                                x2: "12",
                                y2: "12"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "12",
                                y1: "16",
                                x2: "12.01",
                                y2: "16"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2 text-text-default",
                        children: "Error Loading Data"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-text-neutral mb-6",
                        children: error || 'Something went wrong'
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: loadPortfolioData,
                                className: "px-6 py-3 bg-trove-green text-white rounded-xl font-medium hover:bg-trove-green/90 transition-colors",
                                children: "Try Again"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: logout,
                                className: "px-6 py-3 bg-bg-default text-text-default rounded-xl font-medium hover:bg-border transition-colors",
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this);
    }
    const sectorAllocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$portfolioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateSectorAllocation"])(portfolioData.holdings);
    const accountSummaries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$portfolioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountSummaries"])(portfolioData.holdings);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-bg-page flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 max-h-screen overflow-y-auto p-8"
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "KXPkd7bw0fswQ8v/kTF9gM+NGvY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$login$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/login/page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/page.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Home() {
    _s();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    return isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 10,
        columnNumber: 28
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$login$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 10,
        columnNumber: 48
    }, this);
}
_s(Home, "1LGxUrjNz4q7iKM/2JDC9lJQ3xY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_0nyujt9._.js.map