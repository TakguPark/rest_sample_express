function validUser(param_user, param_key) {
  console.log('validUser')
    // response data format
    var ret = {
        user:param_user,
        status:"",
        reason:""
    }

    // db data format
    var user_data = [
        { "user": "mopic1", "key": "test_key1", "expiration_date": "20220615" },
        { "user": "mopic2", "key": "test_key2", "expiration_date": "20210615" },
        { "user": "mopic3", "key": "test_key3", "expiration_date": "20230615" }
    ];

    // 예시 유효날짜의 current_date_time 은 db 기능 같음.
    // 메서드 호출된 시간 기준으로 유효날짜 체크
    var curr_date = new Date();
    var curr_year = "" + curr_date.getFullYear();
    var curr_month = curr_date.getMonth() + 1;
    var curr_day = curr_date.getDate();

    curr_month = (curr_month < 10) ? "0" + curr_month : "" + curr_month;
    curr_day = (curr_day < 10) ? "0" + curr_day : "" + curr_day;

    var check_date_str = curr_year + curr_month + curr_day;

    //이 체크로직이 쿼리로 되면 될듯
    var valid_data = user_data.find(function(elem) {
        return (elem.key == param_key && elem.user == param_user);
    }, this);

    if (valid_data) {
        // 키와 유저가 맞는게 있음
        // 유효날짜 체크
        if (valid_data.expiration_date && +valid_data.expiration_date > +check_date_str) {
            ret.status = "SUCCESS";
        } else {
            ret.status = "FAILED";
            ret.reason = "EXPIRED";
        }
    } else {
        // 키와 유저가 맞는게 없음
        ret.status = "FAILED";
        ret.reason = "INVALID_KEY";
    }

    return ret;
};

function validUser2() {
    throw "error";
};

exports.validUser = validUser;
exports.validUser2 = validUser2;