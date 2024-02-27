using System.Threading.Tasks.Dataflow;

var bufferBlock = new BufferBlock<DateTime>();

//let's pretend we perform an operation that query database or create a http request
var queryBlock = new TransformBlock<DateTime, IEnumerable<int>>((date) => [35, 36, 37, 36, 35]);
var averageTempBlock = new TransformBlock<IEnumerable<int>, double>(temps => temps.Average());


//we simulate the sending message to media platform here.
Func<double, Task> facebookAction = async (averageTemp) =>
{
    Console.WriteLine($"Temp {averageTemp} sent to facebook");
    await Task.CompletedTask;
};

Func<double, Task> twitterAction = async (averageTemp) =>
{
    Console.WriteLine($"Temp {averageTemp} sent to Twitter");
    await Task.CompletedTask;
};

Func<double, Task> telegramAction = async (averageTemp) =>
{
    Console.WriteLine($"Temp {averageTemp} sent to Telegram!!!");
    await Task.CompletedTask;
};

var twitterActionBlock = new ActionBlock<double>(twitterAction);
var facebookActionBlock = new ActionBlock<double>(facebookAction);
var telegramActionBlock = new ActionBlock<double>(telegramAction);

var broadcastMessageBlock = new BroadcastBlock<double>(null);

var linkOptions = new DataflowLinkOptions
{
    PropagateCompletion = true
};

broadcastMessageBlock.LinkTo(twitterActionBlock, linkOptions);
broadcastMessageBlock.LinkTo(telegramActionBlock, linkOptions);
broadcastMessageBlock.LinkTo(facebookActionBlock, linkOptions);

bufferBlock.LinkTo(queryBlock, linkOptions);
queryBlock.LinkTo(averageTempBlock, linkOptions);
averageTempBlock.LinkTo(broadcastMessageBlock, linkOptions);

for (int i = 0; i < 100; i++)
{
    Console.WriteLine($"Iterator {i}");
    bufferBlock.Post(DateTime.UtcNow);
}

Console.ReadLine();
