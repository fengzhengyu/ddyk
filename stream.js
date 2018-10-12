/**
 * Created by Administrator on 2017/9/7.
 */
/**
 * 流：是一种有起点和终点的数据传输手段
 * 上一个的输出是下一个的输入
 **/
console.log('aaa');
//输出流
process.stdout.write('bbb');
//可读流
process.stdin.on('data',function(data){
    console.log(data.toString());
});
