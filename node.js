function startHelloWorld() {
  var http = require("http");

  http
    .createServer(function (request, response) {
      // 发送 HTTP 头部
      // HTTP 状态值: 200 : OK
      // 内容类型: text/plain
      response.writeHead(200, { "Content-Type": "text/plain" });

      // 发送响应数据 "Hello World"
      response.end("Hello World\n");
    })
    .listen(8888);

  // 终端打印如下信息
  console.log("Server running at http://127.0.0.1:8888/");
}

// 阻塞代码实例
function readFile() {
  var fs = require("fs");

  var data = fs.readFileSync("input.txt");

  console.log(data.toString());
  console.log("程序执行结束!");
}

// 非阻塞代码实例
function readFile2() {
  var fs = require("fs");

  fs.readFile("input.txt", function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
  });

  console.log("程序执行结束!");
}

// EventEmitter
function learnEventEmitter() {
  //event.js 文件
  // 引入 events 模块
  var events = require("events");
  // 创建 eventEmitter 对象
  var eventEmitter = new events.EventEmitter();

  eventEmitter.on("some_event", function () {
    console.log("some_event 事件触发");
  });
  setInterval(function () {
    eventEmitter.emit("some_event");
  }, 1000);

  //   还可以带参数
  //   emitter.on("someEvent", function (arg1, arg2) {
  //     console.log("listener2", arg1, arg2);
  //   });
  //   emitter.emit("someEvent", "arg1 参数", "arg2 参数");
}

function learnBuffer() {
  const buf = Buffer.from("runoob", "ascii");

  // 输出 72756e6f6f62
  console.log(buf.toString("hex"));

  // 输出 cnVub29i
  console.log(buf.toString("base64"));

  // 输出 runoob
  console.log(buf.toString("utf8"));

  // 创建 Buffer 类
  // Buffer 提供了以下 API 来创建 Buffer 类：
  // Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
  // Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
  // Buffer.allocUnsafeSlow(size)
  // Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
  // Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
  // Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
  // Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

  // 创建一个长度为 10、且用 0 填充的 Buffer。
  const buf1 = Buffer.alloc(10);

  // 创建一个长度为 10、且用 0x1 填充的 Buffer。
  const buf2 = Buffer.alloc(10, 1);

  // 创建一个长度为 10、且未初始化的 Buffer。
  // 这个方法比调用 Buffer.alloc() 更快，
  // 但返回的 Buffer 实例可能包含旧数据，
  // 因此需要使用 fill() 或 write() 重写。
  const buf3 = Buffer.allocUnsafe(10);

  // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
  const buf4 = Buffer.from([1, 2, 3]);

  // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
  const buf5 = Buffer.from("tést");

  // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
  const buf6 = Buffer.from("tést", "latin1");

  // 写入buf
  buf7 = Buffer.alloc(256);
  len = buf7.write("www.runoob.com");

  console.log("写入字节数 : " + len);
  console.log(buf7.toString("utf8", 0, 5));

  // JSON
  const buf8 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
  const json = JSON.stringify(buf8);

  // 输出: {"type":"Buffer","data":[1,2,3,4,5]}
  console.log(json);

  const copy = JSON.parse(json, (key, value) => {
    return value && value.type === "Buffer" ? Buffer.from(value.data) : value;
  });

  // 输出: <Buffer 01 02 03 04 05>

  //合并buf
  console.log(copy);
  var buffer1 = Buffer.from("菜鸟教程");
  var buffer2 = Buffer.from("www.runoob.com");
  var buffer3 = Buffer.concat([buffer1, buffer2]);
  console.log("buffer3 内容: " + buffer3.toString());
}

// Node.js Stream(流)
// Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

// Node.js，Stream 有四种流类型：

// Readable - 可读操作。

// Writable - 可写操作。

// Duplex - 可读可写操作.

// Transform - 操作被写入数据，然后读出结果。

// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

// data - 当有数据可读时触发。

// end - 没有更多的数据可读时触发。

// error - 在接收和写入过程中发生错误时触发。

// finish - 所有数据已被写入到底层系统时触发。

function learnStream() {
  // 读取流
  var fs = require("fs");
  var data = "";

  // 创建可读流
  var readerStream = fs.createReadStream("input.txt");

  // 设置编码为 utf8。
  readerStream.setEncoding("UTF8");

  // 处理流事件 --> data, end, and error
  readerStream.on("data", function (chunk) {
    console.log("read...");
    data += chunk;
  });

  readerStream.on("end", function () {
    console.log(data);
  });

  readerStream.on("error", function (err) {
    console.log(err.stack);
  });

  console.log("程序执行完毕");

  //写入流
  var fs = require("fs");
  var data = "菜鸟教程官网地址：www.runoob.com";

  // 创建一个可以写入的流，写入到文件 output.txt 中
  var writerStream = fs.createWriteStream("output.txt");

  // 使用 utf8 编码写入数据
  writerStream.write(data, "UTF8");

  // 标记文件末尾
  writerStream.end();

  // 处理流事件 --> finish、error
  writerStream.on("finish", function () {
    console.log("写入完成。");
  });

  writerStream.on("error", function (err) {
    console.log(err.stack);
  });

  console.log("程序执行完毕");

  //读取一个文件加入到另外一个文件
  var fs = require("fs");

  // 创建一个可读流
  var readerStream = fs.createReadStream("input.txt");

  // 创建一个可写流
  var writerStream = fs.createWriteStream("output.txt");

  // 管道读写操作
  // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
  readerStream.pipe(writerStream);

  console.log("程序执行完毕");

  //   链式流
  //   链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
  //   接下来我们就是用管道和链式来压缩和解压文件。
  //   创建 compress.js 文件, 代码如下：
  var fs = require("fs");
  var zlib = require("zlib");

  // 压缩 input.txt 文件为 input.txt.gz
  fs.createReadStream("input.txt")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream("input.txt.gz"));

  console.log("文件压缩完成。");
  // 解压 input.txt.gz 文件为 input.txt
  fs.createReadStream("input.txt.gz")
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream("input.txt"));

  console.log("文件解压完成。");
}

function learnHttp() {
  var http = require("http");
  var url = require("url");

  function start() {
    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("Hello World");
      response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
  }
  start();
}

function learnExpress() {
  //express_demo.js 文件
  var express = require("express");
  var app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
  });
}
