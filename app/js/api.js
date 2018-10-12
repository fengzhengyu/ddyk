/**
 * Created by Administrator on 2017/7/10.
 */
//47.94.249.58
//var DD_host='http://192.168.1.10';
var DD_host='http://47.94.249.58/ddyk/Api/Goods/selectGoodsSunType';
var DD_api={
    //短信验证接口
    sendMessage                : DD_host + '/ddyk/index.php/Api/sign/sendMessage',
    //注册成功接口
    sendSign                   : DD_host + '/ddyk/index.php/Api/sign/sign',
    //修改密码短信验证接口
    sendUpdateMessage          : DD_host + '/ddyk/index.php/Api/sign/sendUpdateMessage',
    //修改密码提交接口
    submitPassword             : DD_host + '/ddyk/index.php/Api/sign/password',
    //主页数据接口
    indexGoods                 : DD_host + '/ddyk/Api/Goods/selectGoodsIndex',
    //主页左侧八个商品接口
    indexEightList             : DD_host + '/ddyk/Api/Goods/selectGoodsInvestmentList',
    //十大父类接口
    parentTypeGoods            : DD_host + '/ddyk/Api/Goods/selectGoodsPartentType',
    //搜索内容接口
    searchGoodsList            : DD_host + '/ddyk/Api/Goods/searchGoodsList',
    //推荐商品接口
    recommendGoods             : DD_host + '/ddyk/Api/Goods/recommendGoods',
    //父类旗下子类接口
    sunTypeGoods               : DD_host + '/ddyk/Api/Goods/selectGoodsSunType',
    //招商商品数据接口
    merchantsGoods             : DD_host + '/ddyk/Api/Goods/selectGoodsTypeList',
    //招商详情数据接口
    merchantsDetailsGoods      : DD_host + '/ddyk/Api/Goods/goodsInfo',
    //代理数据库接口
    agentData                  : DD_host + '/ddyk/Api/Channel/agentInfo',
    //代理数据库筛选、搜索
    selectAgent                : DD_host + '/ddyk/Api/Channel/selectAgent',
    //代理数据下载认证
    downloadAuth               : DD_host + '/ddyk/Api/Channel/downloadAuth',
    //代理数据下载
    agentDownload              : DD_host + '/ddyk/Api/Channel/agentDownload',
    //代理求购信息
    buyIndex                   : DD_host + '/ddyk/Api/Channel/buyIndex',
    //代理数据库筛选、搜索
    selectBuy                  : DD_host + '/ddyk/Api/Channel/selectBuy',
    //代理求购查看认证
    buyFindAuth                : DD_host + '/ddyk/Api/Channel/buyFindAuth',
    //代理求购查看
    buyFindInfo                : DD_host + '/ddyk/Api/Channel/buyFindInfo',

    //营销接口
    marketIndex                : DD_host + '/ddyk/Api/Channel/marketIndex',
    //营销详情
    marketInfo                 : DD_host + '/ddyk/Api/Channel/marketInfo',
    //营销精彩
    marketElite                : DD_host + '/ddyk/Api/Channel/marketElite',
    //营销热门
    marketTop                  : DD_host + '/ddyk/Api/Channel/marketTop',
    //营销搜索
    searchMarket               : DD_host + '/ddyk/Api/Channel/searchMarket',

    //采购
    procurementIndex           : DD_host + '/ddyk/Api/Channel/procurementIndex',
    //采购详情
    procurementInfo            : DD_host + '/ddyk/Api/Channel/procurementInfo',
    //采购精彩
    procurementElite           : DD_host + '/ddyk/Api/Channel/procurementElite',
    //采购热门
    procurementTop             : DD_host + '/ddyk/Api/Channel/procurementTop',
    //采购搜索
    searchProcurement          : DD_host + '/ddyk/Api/Channel/searchProcurement',

    //资讯
    consultIndex               : DD_host + '/ddyk/Api/Channel/consultIndex',
    //资讯详情
    consultInfo                : DD_host + '/ddyk/Api/Channel/consultInfo',
    //资讯精
    consultElite               : DD_host + '/ddyk/Api/Channel/consultElite',
    //资讯热门
    consultTop                 : DD_host + '/ddyk/Api/Channel/consultTop',
    //资讯搜索
    searchConsult              : DD_host + '/ddyk/Api/Channel/searchConsult',

    //专题
    specialIndex               : DD_host + '/ddyk/Api/Channel/specialIndex',
    //专题
    specialInfo                : DD_host + '/ddyk/Api/Channel/specialInfo',
    //专题
    specialElite               : DD_host + '/ddyk/Api/Channel/specialElite',
    //专题
    specialTop                 : DD_host + '/ddyk/Api/Channel/specialTop',
    //专题
    searchSpecial              : DD_host + '/ddyk/Api/Channel/searchSpecial',

    //健康
    healthIndex                : DD_host + '/ddyk/Api/Channel/healthIndex',
    //健康详情
    healthInfo                 : DD_host + '/ddyk/Api/Channel/healthInfo',
    //健康精彩
    healthElite                : DD_host + '/ddyk/Api/Channel/healthElite',
    //健康热门
    healthTop                  : DD_host + '/ddyk/Api/Channel/healthTop',
    //健康搜索
    searchHealth               : DD_host + '/ddyk/Api/Channel/searchHealth',

    //视频主页
    memberSelectVideo          : DD_host +  '/ddyk/Api/Member/memberSelectVideo',
    //视频分类
    videoType                  :  DD_host + '/ddyk/Api/Member/videoType',
    //视频分类list
    videoTypeList              :  DD_host + '/ddyk/Api/Member/videoTypeList',
    //视频观看提示
    videoInfo                 :  DD_host + '/ddyk/Api/Member/videoInfo',
    //返回视频地址
    videoPlay                  :  DD_host + '/ddyk/Api/Member/videoPlay',
    //相关视屏
    relationVideo              : DD_host + '/ddyk/Api/Member/relationVideo',
    
    //省数据接口
    provinceData               : DD_host + '/ddyk/index.php/Api/sign/province',

    //市数据接口
    cityData                   : DD_host + '/ddyk/index.php/Api/sign/city',

    //区数据接口
    countryData                : DD_host + '/ddyk/index.php/Api/sign/country',

    //代理渠道、代理性质接口
    agentChannelData           : DD_host + '/ddyk/Api/Goods/messageInfo',

    //招商详情收藏接口
    merchantsDetailsCollection : DD_host + '/ddyk/Api/Goods/memberGoodsCollect',

    //招商详情验证码接口
    merchantsDetailsCode       : DD_host + '/ddyk/Api/Goods/messageCode',

    //提交留言接口
    merchantsDetailsMessage    : DD_host + '/ddyk/Api/Goods/message',

    //会员首页上传头像接口
    memberIndexPhoto           : DD_host + '/ddyk/Api/Member/updateHeadPhoto',

    //会员操作管理数据接口
    memberAllInfo              : DD_host + '/ddyk/Api/Goods/memberAllInfo',
    //判断签到状态
    memberLoginGoldAuth        : DD_host + '/ddyk/Api/Member/memberLoginGoldAuth',
    //点击签到
    memberLoginGold            : DD_host + '/ddyk/Api/Member/memberLoginGold',
    //企业类型、经营品类接口
    enterpriseTypeCategory     : DD_host + '/ddyk/Api/Member/memberTypeInfo',

    //修改基本信息接口
    editMemberInfo             : DD_host + '/ddyk/Api/Member/editMemberInfo',
    //基本信息保存接口
    insertMemberInfo           : DD_host + '/ddyk/Api/Member/insertMemberInfo',

    //修改会员昵称接口
    updateMemberName           : DD_host + '/ddyk/Api/Member/updateMemberName',

    //修改会员密码接口
    updateMemberPassword       : DD_host + '/ddyk/Api/Member/updateMemberPassword',

    //修改手机号码接口
    updateMemberPhone          : DD_host + '/ddyk/Api/Member/updateMemberPhone',

    //修改会员邮箱接口
    updateMemberEmail          : DD_host + '/ddyk/Api/Member/updateMemberEmail',

    //发布招商信息接口
    publishingInvestment       : DD_host + '/ddyk/Api/Member/memberAddGoods',

    //管理招商信息接口
    managementInvestment       : DD_host + '/ddyk/Api/Member/memberSelectGoodsList',

    //广告时间、类型接口
    advertisingTypeDate        : DD_host + '/ddyk/Api/Member/adRequest',
    //置顶招商管理接口
    investmentGoldSure         : DD_host + '/ddyk/Api/Member/investmentGoldSure',
    //确定置顶
    investmentTop              : DD_host + '/ddyk/Api/Member/investmentTop',
    //提交申请广告接口
    submitAdvertisement        : DD_host + '/ddyk/Api/Member/adCheck',
    //删除招商管理信息接口
    deleteSureGoods            : DD_host + '/ddyk/Api/Member/deleteSureGoods',
    //修改管理招商信息接口
    modifyManagementInvestment : DD_host + '/ddyk/Api/Member/memberGoodsEdit',
    //修改发布招商信息接口
    modifyPublishingInvestment : DD_host + '/ddyk/Api/Member/memberGoodsUpdate',
    //收藏招商信息接口
    collectInvestment          : DD_host + '/ddyk/Api/Member/collect',
    //删除收藏
    collectDelete              : DD_host + '/ddyk/Api/Member/collectDelete',
    //收到留言接口
    messageReceive             : DD_host + '/ddyk/Api/Member/messageReceive',
    //删除收到/我的留言
    deleteSureMessage          : DD_host + '/ddyk/Api/Member/deleteSureMessage',
    //我的留言接口
    myMessage                  : DD_host + '/ddyk/Api/Member/message',
    //发布求购 代理区域代理渠道
    buyGoodsAdd                : DD_host + '/ddyk/Api/Member/buyGoodsAdd',
    //发布求购 提交
    memberAddBuyGoods          : DD_host + '/ddyk/Api/Member/memberAddBuyGoods',
    //求购管理
    memberBuyIndex             : DD_host + '/ddyk/Api/Member/memberBuyIndex',
    //修改求购管理
    memberBuyGoodsEdit         : DD_host + '/ddyk/Api/Member/memberBuyGoodsEdit',
    //提交修改求购管理
    memberUpdateBuyGoods       : DD_host + '/ddyk/Api/Member/memberUpdateBuyGoods',
    //删除求购管理
    buyDelete                  : DD_host + '/ddyk/Api/Member/buyDelete',
    //我的商铺
    memberSelectShopGoods      : DD_host + '/ddyk/Api/Member/memberSelectShopGoods',
    //访问我的商铺
    userSelectShopGoods        : DD_host + '/ddyk/Api/Member/userSelectShopGoods',
    //商铺上传logo
    updateShopPhoto            : DD_host + '/ddyk/Api/Member/updateShopPhoto',

    //微信充值
    weChatPay                  : DD_host + '/ddyk/Api/weixinpay/weChatPay',
    //充值后积分接口
    memberSelectGold           : DD_host + '/ddyk/Api/Member/memberSelectGold'
};