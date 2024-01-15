var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ErrorsUtils = /** @class */ (function () {
    function ErrorsUtils() {
    }
    ErrorsUtils.catchError = function (res, error) {
        console.log(error);
        return res.status(error.status || 500).json(error);
    };
    return ErrorsUtils;
}());
export { ErrorsUtils };
var WebError = /** @class */ (function () {
    function WebError(status, error) {
        this.status = status;
        this.error = error;
    }
    return WebError;
}());
var Unprocessable = /** @class */ (function (_super) {
    __extends(Unprocessable, _super);
    function Unprocessable(error) {
        return _super.call(this, 422, error) || this;
    }
    return Unprocessable;
}(WebError));
export { Unprocessable };
var Conflict = /** @class */ (function (_super) {
    __extends(Conflict, _super);
    function Conflict(error) {
        return _super.call(this, 409, error) || this;
    }
    return Conflict;
}(WebError));
export { Conflict };
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(error) {
        return _super.call(this, 404, error) || this;
    }
    return NotFound;
}(WebError));
export { NotFound };
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(error) {
        return _super.call(this, 403, error) || this;
    }
    return Forbidden;
}(WebError));
export { Forbidden };
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(error) {
        return _super.call(this, 401, error) || this;
    }
    return Unauthorized;
}(WebError));
export { Unauthorized };
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(error) {
        return _super.call(this, 400, error) || this;
    }
    return BadRequest;
}(WebError));
export { BadRequest };
