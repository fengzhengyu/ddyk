/**
 * Created by Administrator on 2017/9/7.
 */
/**
 * ������һ���������յ�����ݴ����ֶ�
 * ��һ�����������һ��������
 **/
console.log('aaa');
//�����
process.stdout.write('bbb');
//�ɶ���
process.stdin.on('data',function(data){
    console.log(data.toString());
});
